$(function(){
  var chropolethDataLibrary = {};

  var colorScales = {
    'Percent Part-Time': ['#FFB581', '#FF8747', '#C06000'],
    'Percent Non-Traditional Age (25 and Older)': ['#FF8181', '#FF4747', '#C01D00'],
    'Percent Minority': ['#98FF81', '#4DFF47', '#10C000'],
    'First-Year Retention Rate': ['#81D6FF', '#4766FF', '#000DC0 '],
    'Three-Year Graduation Rate': ['#D881FF', '#B347FF', '#8400C0'],
    'Percent of Undergrads Receiving Pell, 2011-12': ['#FFE781', '#FFF747', '#BEC000']
  };

  function parseLatLon (input) {
    var parts = input.split(/,/);
    var lat = parseFloat(parts[0]);
    var lng = parseFloat(parts[1]);
    return [lat,lng];
  }

  function slugify (string) {
    return string.toLowerCase().replace(/\s/g, '-');
  }

  function scrollTo ($destinationSelector) {
    $('html, body').animate({
      scrollTop: $destinationSelector.offset().top
    }, 1000);
  }

  function scrollToNextSection (e) {
    var $parent = $(e.target).closest('section, header');
    scrollTo($parent.next());
  }

  function addButtonListeners ($container) {
    $('.close').click(function (event) {
      $(this).off();
      $container.html('');
    });
  }

  function trimFloat (number) {
    return Math.floor(number * 100) / 100;
  }

  function createChoroplethData (dataArr, field) {
    if (!chropolethDataLibrary.hasOwnProperty(field)) {
      var arrData = [];
      dataArr.map(function (item, index) {
        return  { state: item.State, data: item[field], headcount: item['Size: Annual Unduplicated Headcount'] };
      }).reduce(function (prev, curr, index, array) {
         if (curr.state  === prev.state) {
            // if  it's the last item in the array
            if (index === array.length - 1) {
              prev.data = (curr.data/100 * parseInt(curr.headcount.replace(',', '')) + prev.data) / (prev.totalheadcount + parseInt(curr.headcount.replace(',', ''))) * 100; arrData.push(prev);
            }
            return { data: parseFloat(prev.data)  + (parseInt(curr.headcount.replace(',', '')) * parseFloat(curr.data)/100.0), state: curr.state, totalheadcount: prev.totalheadcount + parseInt(curr['headcount'].replace(',', ''))  };
          } else {
            prev.data = prev.data / prev.totalheadcount * 100;
            arrData.push(prev);
            curr.totalheadcount = parseInt(curr.headcount.replace(',', ''));
            curr.data = parseFloat(curr.data)/100 * curr.totalheadcount;
            return curr;
          }
      }, {data:0, state: 'AK', totalheadcount: 0});
      var statesObj = {};

      arrData.forEach(function (item, index) {
        statesObj['US-'+item.state] = parseFloat(item.data);
      });

      chropolethDataLibrary[field] = statesObj;
    }

    return chropolethDataLibrary[field];
  }
  // event listeners
  $('.icon-angle-double-down').click(scrollToNextSection);

  // ajax call to get our big chunk of json data
  $.ajax( {
    url: "/data.json",
    dataType: 'json'
  }).done(function (data) {
    var dataArr = data;

    $('.field-desc').text($('.slider form input:checked').data('desc'));

    var statesValues = createChoroplethData(dataArr, 'Percent Part-Time');

    var starred = dataArr.filter(function (item, index) {
      item.origIndex = index;
      return item.starred;
    }).map(function (item,index) {
      var latLng =  parseLatLon(item['latitude,longitude']);
      var obj = {
        latLng: latLng,
        name: item['Institution Name'],
        'Percent Non-Traditional Age (25 and Older)': item['Percent Non-Traditional Age (25 and Older)'],
        'First-Year Retention Rate': item['First-Year Retention Rate'],
        'Size: Annual Unduplicated Headcount': item['Size: Annual Unduplicated Headcount'],
        'Percent Minority': item['Percent Minority'],
        'Percent of Undergrads Receiving Pell, 2011-12': item['Percent of Undergrads Receiving Pell, 2011-12'],
        'Percent Part-Time': item['Percent Part-Time'],
        'Three-Year Graduation Rate': item['Three-Year Graduation Rate'],
        starred: item.starred,
        link: slugify(item['Institution Name']),
        style: {
          fill: 'yellow'
        }
      };
      return obj;
    });

    window.localStorage.setItem('starred', JSON.stringify(starred));

    var theMap = new jvm.Map({
      container: $('#world-map-gdp'),
      map: 'us_merc',
      markers: JSON.parse(window.localStorage.getItem('starred')),
      zoomOnScroll: false,
      backgroundColor: '#FFFFFF',
      series: {
        regions: [{
          attribute: 'fill',
          scale: colorScales['Percent Part-Time'],
          values: statesValues
        }],
      },

      onRegionTipShow: function (event, label, code){
        label.html(
          '<b>'+label.html()+'</b>'+
          '<b>'+ $('.map h3').text() + ':</b> ' + trimFloat(statesValues[code])
        );
      },

      onRegionClick: function (e, code) {
        theMap.setFocus({ region: code, animate: true });
        theMap.params.placeCollegesOnStateMap(code);
      },

      onMarkerClick: function (e, code) {
        $(".se-pre-con").show();;
        var templateMarkup = $('template[name="coleman"]').html();
        var $timelineContainer = $('section.timeline');
        $timelineContainer.html('<h2>Timeline</h2> <h3>'+ JSON.parse(window.localStorage.getItem('starred'))[code]['name']+'</h3>');

        $timelineContainer.append(templateMarkup);

        addButtonListeners($timelineContainer);


        $timelineContainer.find('iframe').load(function(){
          // $(this).show();

          setTimeout(function () {
            $(".se-pre-con").fadeOut("slow");;
            scrollTo($timelineContainer);
          },2000);

          // console.log('load the iframe ', this.readyState)

        });

      },

      onMarkerTipShow: function (event, label, index) {
        var sourceArr;
        var name;

        // index is a 0 - 4 for the starred colleges, and otherwise the name of the college
        if (/\d+/.test(index)) {
          sourceArr  = JSON.parse(window.localStorage.getItem('starred'));
          name = sourceArr[index]['name'];
          var found = sourceArr.find(function (item) {
            // console.log(item.name, name);
            return item.name === name;
          });
        } else {
          sourceArr = JSON.parse(window.localStorage.getItem('currentStateData'));
          name = index;
          var found = sourceArr.find(function (item) {
            return item.name === name;
          });
        }

        label.html('<b class="college_name">'+ name +'</b><br/><b> Percent Non-Traditional Age (25 and Older):</b> '+ found['Percent Non-Traditional Age (25 and Older)']+'<br/><b> First-Year Retention Rate:</b> '+ found['First-Year Retention Rate']+'<br/><b>Size: Annual Unduplicated Headcount:</b> '+ found['Size: Annual Unduplicated Headcount']+'<br/><b> Percent Minority:</b> ' + found['Percent Minority'] + '<br/> <b> Percent of Undergrads Receiving Pell, 2011-12:</b> ' + found['Percent of Undergrads Receiving Pell, 2011-12'] + '<br/><b> Percent Part-Time:</b>  ' +  found['Percent Part-Time'] + '<br/><b> Three-Year Graduation Rate: </b> ' + found['Three-Year Graduation Rate']);
      },

      placeCollegesOnStateMap: function (code) {
        code = code.replace('US-', '');
        var locationData = dataArr.filter(function(item){
          // !item.starred -- don't cover up the starred item with a regular dot
          return item.State === code && !item.starred;
        }).map(function (item,index) {
          var latLng =  parseLatLon(item['latitude,longitude']);
          return { latLng: latLng, name: item['Institution Name'],  'Percent Non-Traditional Age (25 and Older)': item['Percent Non-Traditional Age (25 and Older)'], 'First-Year Retention Rate': item['First-Year Retention Rate'], 'Size: Annual Unduplicated Headcount': item['Size: Annual Unduplicated Headcount'], 'Percent Minority': item['Percent Minority'], 'Percent of Undergrads Receiving Pell, 2011-12': item['Percent of Undergrads Receiving Pell, 2011-12'],'Percent Part-Time': item['Percent Part-Time'], 'Three-Year Graduation Rate': item['Three-Year Graduation Rate'] };
        });

        if (theMap.markers) {
          var markersToRemove = [];
          for (var markerName in theMap.markers) {
            if (!/\d/.test(markerName)) {
              markersToRemove.push(markerName);
            }
          }
          theMap.removeMarkers(markersToRemove);
        }

        window.localStorage.setItem('currentStateData', JSON.stringify(locationData));

        JSON.parse(window.localStorage.getItem('currentStateData')).forEach(function (item) {
          theMap.addMarker(item.name, item);
        });
      }
    });


    $('#slider form').click(function(e) {

      if (e.target && e.target.value) {
        statesValues = createChoroplethData(dataArr, e.target.value);
        // commented out code here appears to not be doing anything, but just in case
        // theMap.series.regions[0].clear();
        // can't tell if this is actually changing the min and max values, but it was what was suggested in https://github.com/bjornd/jvectormap/issues/221
        // theMap.params.min = jvm.min(statesValues);
        // theMap.params.max = jvm.max(statesValues);

        theMap.series.regions[0].setValues(statesValues);

        theMap.series.regions[0].setScale(colorScales[e.target.value]);

        // again, not sure if this is doing anything, but just ot be safe
        // theMap.series.regions[0].scale.maxValue = jvm.max(statesValues);
        // theMap.series.regions[0].scale.clearMaxValue = jvm.max(statesValues);
        // theMap.series.regions[0].scale.minValue = jvm.min(statesValues);
        // theMap.series.regions[0].scale.clearMinValue = jvm.min(statesValues);

        $('.field-desc').text($(e.target).data('desc'));
      }
    });
  }).fail(function (error) {
    console.error("error: ", error);
  });
});

