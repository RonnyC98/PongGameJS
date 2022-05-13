//--------------
//CLASE PALETA--
//--------------

class Paleta {
  constructor(alturaPaletaAj) {
    this.score = 0,
      //Velocidad de movimiento de la paleta
      this.speed = 800,
      this.width = 24,
      this.height = alturaPaletaAj,

      /*USAREMOS LA LIBRERÍA EXTERNA DE VECTORES, esto es para gestionar el contacto pelota-paleta
        y darle un efecto de rebote más realista*/
      //Coordenadas
      this.points = [],
      this.pos = new Vector2,
      this.pivot = new Vector2,
      //Vector para la dirección (equivale al que se usa en la versión simple)
      this.direction = new Vector2,
      this.bgImage = new Image,

      //Para el efecto de inclinación de la paleta al moverse, se usa en el renderizado
      this.angle = -1,

      /*El  método estático Object.defineProperty() define una nueva propiedad 
      sobre un objeto o modifica una ya existente, y devuelve el objeto modificado.
      NOS PERMITE AÑADIR Y MODIFICAR DE FORMA PRECISA LAS PROPIEDADES*/

      //Definiendo propiedad x
      Object.defineProperty(this, 'x', {
        get: function () {
          return this.pos.x;
        },
        set: function (value) {
          this.pos.x = value;
        }
      });

    //Definiendo propiedad y
    Object.defineProperty(this, 'y', {
      get: function () {
        return this.pos.y;
      },
      set: function (value) {
        this.pos.y = value;
      }
    });

    /*USAREMOS FUNCIONES DE LA LIBRERÍA EXTERNA DE VECTORES*/
    this.updatePivot = function () {
      this.pivot.set(this.width / 2, this.height / 2).addSelf(this.pos);
    },

      this.updatePoints = function (movementYaxis) {
        for (var i = 0; i < this.points.length; i++) {
          this.points[i].y += movementYaxis;
        }
      },

      this.rotatePoints = function (angle) {
        for (var i = 0; i < this.points.length; i++) {
          this.points[i].rotateAroundPivot(this.pivot, angle);
        }
      },

      // Realinear puntos al eje, como si girara con un ángulo de 0.
      this.realignPoints = function () {
        var topRight = new Vector2(this.width, 0), bottomRight = new Vector2(this.width, this.height), bottomLeft = new Vector2(0, this.height);

        this.points = [
          this.pos.clone(),
          this.pos.clone().addSelf(topRight),
          this.pos.clone().addSelf(bottomRight),
          this.pos.clone().addSelf(bottomLeft)
        ];
      },

      /*RENDERIZAR PALETA EN EL CANVAS*/
      this.render = function () {
        //Si el ángulo es cero, es decir, paró de moverse o aún no empieza, la mostramos sin inclinación
        if (this.angle == 0) { 
          if (this.bgImage.loaded) {
            ctx.drawImage(this.bgImage, this.x, this.y);
          }
        //Si no, hay que darle el efecto de inclinación a la paleta
        } else {
          //Guardamos el contexto actual
          ctx.save();
          //Transformamos al punto de pivote
          ctx.translate(this.pivot.x, this.pivot.y);
          //Inclinamos la paleta
          ctx.rotate((Math.PI / 180) * this.angle);
          //Transformamos de nuevo al origen
          ctx.translate(-1 * this.pivot.x, -1 * this.pivot.y);
          //Renderizamos (dibujamos imagen en el canvas)
          ctx.drawImage(this.bgImage, this.x, this.y);
          //Restauramos el contexto original
          ctx.restore();
        }
      };

    return this;
  }
}
