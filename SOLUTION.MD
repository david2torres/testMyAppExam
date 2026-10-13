## Que se implemento

Se implemento el uso de Reactive form para tener mejor y mayor control en el manejo de estados del formulario. (Estados de error, limpieza, envio)

Se implemento manejo de lista de errores centralizado mediante funcion _collectError para listarlos dinamicamente una vez se envie.

Se implemento estrategia de formBuilder  para controlar de manera Asyncrona enventos de formulario para que se pudieran limpiar  una vez finalizado el envio del fomulario

Se agrego campo Email.

Se implemento centrlizacion de interfaces y camvbio de retorno tipo ANY para que funcione de acuerdo a interfaces definidas

Se agrego expresiones regulares para controlar pattern en emial. y correo

Se implemento funcionalidad para eliminar mediante endpoint sugerido.

Se implemento el uso de mocks y comportamientos de acuerdo a un consumo real para los casos CRUD.

Mediante environment se centreliza el uso de mocks para en caso de cambios solo afectar una seccion y no reescribir varias capas.

Se agrego comportamiento de  FORM en e;l html y control de acuerdo a material y manejo de estados.

Se expandio funcion de error en puntos donde se requiere un control personalizado mediante ;a funcion hasError

## Como se implemento


## Dificultades Encontradas

Formulario quedaba en rojo al momento de limpiarlo:  Inicialmente se dejo el submit en el boton, y sin el type ele evento se ejecutada ede manera asyncrona 2 veces dejando el form en rojo. La solucion al ser un formulario corto fue dejar el submit directo al form. Sin embargo por accesibilidad, lo mejor es dejarlo en el button y especificar el type para que los nabegadores detecten que no se esta renderizando nuevamente la pagina.

Tipado estatico aumenta el margen de error, por eso se creo de manera global basado en constantes para reducir margen de error y escalar de acuerod a cotnratos previos definidos.

Para entender y ver comportamiento del CRUD  se implemento el manejo de retorno de mock desde servicio, interactuando directamente desde el service la dara


## Mejoras Que se aplicarian
Implementar un interceptor que permita controlar mejor el estado del mock y los headers del aplicativo, segregando mejor las responsabilidades.

Implementacion de pruebas unitarias que garanticen scope y principios SOLID y Clean dentro del proyecto.

Tener mejor UX dfrente al manejo de los errores

centralizar capa de control de error.

Tipar mejopr los formularios.
