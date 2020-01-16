ymaps.ready(init);

function init(){
  var myMap = new ymaps.Map('map', {
    // center: [59.938824, 30.323138],
    center: [59.938714, 30.323004],
    zoom: 17,
    controls: []
  });

  var myPlacemark = new ymaps.Placemark([59.938714, 30.323004], {
    balloonContentHeader: 'CatEnergy',
    balloonContentBody: 'Ул. Большая Конюшенная, д.&nbsp;19/8',
    hintContent: 'Мы находимся здесь'
  },
  {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-pin.png',
    iconImageSize: [55, 47],
    iconImageOffset: [-27.5, -47]
  });


  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable('scrollZoom');
}
