$(function(){

  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }

  var chropolethDataLibrary = {};
  var starredItemHex = '#FFFF00';
  var colorScales = {
    'Percent Part-Time': ['#FEE6CE','#FDAE6B','#E550D'],
    'Percent Non-Traditional Age (25 and Older)': ['#FEE0D2','#FC9272','#DE2D26'],
    'Percent Minority': ['#E5F5E0','#A1D99B','#31A354'],
    'First-Year Retention Rate': ['#DEEBF7','#9ECAE1','#3182BD'],
    'Three-Year Graduation Rate': ['#EFEDF5','#BCBDDC','#756BB1'],
    'Percent of Undergrads Receiving Pell, 2011-12': ['#FBF9DC', '#F5F3B7', '#EAEA83']
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

  function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
  }

  function onScroll () {
    if ($(this).scrollTop() + $(this).height() === getDocHeight()) {
      $('.social-media-buttons-container').addClass('bottom_of_page');
      $('.social-media-buttons-container').removeClass('not_bottom_of_page');
    } else if ($(this).scrollTop() + $(this).height() !== getDocHeight()) {
      $('.social-media-buttons-container').addClass('not_bottom_of_page');
      $('.social-media-buttons-container').removeClass('bottom_of_page');
    }

    // if ($('.social-media-buttons-container').css('position') === 'static' && $(this).scrollTop() + $(this).height() !== getDocHeight()) {
    //   $('.social-media-buttons-container').css('position', 'fixed');
    // }
  }

  function trimFloat (number) {
    return Math.floor(number * 100) / 100;
  }

  function setStartingData (dataArr, field) {
    var $formCheckbox = $('form').find($('[value="'+ field + '"]'));
    $formCheckbox.attr('checked', 'true');

    $('.field-desc').text($('form input:checked').data('desc'));

    var statesValues = createChoroplethData(dataArr, field);
    return statesValues;
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
  $(window).scroll($.debounce(250,onScroll));
  // ajax call to get our big chunk of json data
  $.ajax( {
    url: "/data.json",
    dataType: 'json'
  }).done(function (data) {
    var dataArr = data;
    var startingField = $('form input:checked').attr('value');
    var statesValues = setStartingData(dataArr, startingField);

    var starred = dataArr.filter(function (item, index) {
      item.origIndex = index;
      return item.starred;
    }).map(function (item,index) {
      var latLng =  parseLatLon(item['latitude,longitude']);
      var obj = item;

      obj.latLng = latLng;
      obj.style = {
        fill: starredItemHex,
        'stroke-width': 0
      };

      return obj;
    });

    starred[4] = {
      'Institution Name': 'CUNY Guttman Community College',
      'City': 'New York',
      'State': 'NY',
      'latLng': parseLatLon('40.7528906,-73.9862344'),
      'starred': 'true',
      'message': 'Click for more info',
      'style': {
        'fill': starredItemHex,
        'stroke-width': 0
      }
    };

    window.localStorage.setItem('starred', JSON.stringify(starred));
    console.log('startingField: ', startingField);
    var theMap = new jvm.Map({
      container: $('#world-map-gdp'),
      map: 'us_merc',
      markers: JSON.parse(window.localStorage.getItem('starred')),
      zoomOnScroll: false,
      backgroundColor: '#FFFFFF',
      markerStyle: {
        hover: {
          'stroke-width': 5,
          'stroke': '#FFFFFF',
          cursor: 'default'
        }
      },
      series: {
        regions: [{
          attribute: 'fill',
          scale: colorScales[startingField] ,
          values: statesValues,
          currentDataField: startingField
        }]
      },

      onRegionTipShow: function (event, label, code) {
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
        if (JSON.parse(window.localStorage.getItem('starred'))[code]) {
          $("#loader").show();

          var templateMarkup = $('template[name="coleman"]').html();
          var $timelineContainer = $('section.timeline');
          $timelineContainer.html('<h2>Timeline</h2> <h3>'+ JSON.parse(window.localStorage.getItem('starred'))[code]['name']+'</h3>');

          $timelineContainer.append(templateMarkup);

          addButtonListeners($timelineContainer);


          $timelineContainer.find('iframe').load(function(){
            // $(this).show();

            setTimeout(function () {
              $("#loader").fadeOut("slow");;
              scrollTo($timelineContainer);
            }, 3500);

            // console.log('load the iframe ', this.readyState)

          });
        }
      },

      onMarkerTipShow: function (event, label, index) {
        var sourceArr,
        name,
        found;

        var labelString = '',
        fieldsToFilter = ['origIndex', 'latitude,longitude', 'style', 'latLng', 'starred'];

        // index is a 0 - 4 for the starred colleges, and otherwise the name of the college
        if (/\d+/.test(index)) {
          sourceArr  = JSON.parse(window.localStorage.getItem('starred'));
          name = sourceArr[index]['Institution Name'];

          found = sourceArr.find(function (item) {
            return item['Institution Name'] === name;
          });
        } else {
          // --- nonstarred colleges ---
          sourceArr = JSON.parse(window.localStorage.getItem('currentStateData'));
          name = index;

          found = sourceArr.find(function (item) {
            return item['Institution Name'] === name;
          });
        }

        for (var field in found) {
          var isItToBeFiltered = fieldsToFilter.find(function (toBeFiltered) {

            return field === toBeFiltered;
          });
          console.log('IS it supposed tobe filtered: ', isItToBeFiltered);
          if (field === 'message') {
            labelString += '<b>'+ found[field] + '</b>';
          } else if (!isItToBeFiltered) {
            labelString += '<b>' + field + ':</b> ' + found[field] + '<br>';
          }
        };

        label.html(labelString);
      },

      placeCollegesOnStateMap: function (code) {
        code = code.replace('US-', '');
        var locationData = dataArr.filter(function(item){
          // !item.starred -- don't cover up the starred item with a regular dot
          return item.State === code && !item.starred;
        }).map(function (item,index) {
          var obj = item;
          var latLng =  parseLatLon(item['latitude,longitude']);

          obj.latLng = latLng;
          obj.style = {
            fill: '#14a797',
            "stroke-width" : 0,
              hover: {
                "fill-opacity": 0.6,
                "stroke-width": 0,
                cursor: 'default'
              }
          }

          return obj;

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

        locationData.forEach(function (item) {
          theMap.addMarker(item['Institution Name'], item);
        });
      }
    });


    $('#slider form').click(function(e) {

      if (e.target && e.target.value) {
        statesValues = createChoroplethData(dataArr, e.target.value);
        theMap.series.regions[0].currentDataField = e.target.value;
        // commented out code here appears to not be doing anything, but just in case
        // theMap.series.regions[0].reset();
        theMap.series.regions[0].clear();
        // can't tell if this is actually changing the min and max values, but it was what was suggested in https://github.com/bjornd/jvectormap/issues/221
        // theMap.series.regions[0] = {
        //   attribute: 'fill',
        //   scale: colorScales[e.target.value],
        //   values: statesValues,
        //   normalizeFunction: 'polynomial'
        // };
        // var newDataSeries = new
        // theMap.params.min = jvm.min(statesValues);
        // theMap.params.max = jvm.max(statesValues);
        // theMap.params.legend = {'horizontal': true};
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

