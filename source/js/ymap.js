ymaps.ready(init);

function init(){
  var myMap = new ymaps.Map("map", {
    center: [59.938631, 30.323055],
    zoom: 16
  });

  var myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
    balloonContentHeader: 'CatEnergy',
    balloonContentBody: 'Ул. Большая Конюшенная, д.&nbsp;19/8',
    hintContent: 'Мы находимся здесь'
  },
  {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-pin.png',
    iconImageSize: [55, 53],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-5, -38]
  });

myMap.geoObjects.add(myPlacemark);
myMap.behaviours.disable([
  'drag',
  'scrollZoom',
  'leftMouseButtonMagnifier'
]);
}
