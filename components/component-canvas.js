// Компонент canvas выполняющий отрисовку -->
const componentcanvas = {
  template: `
  <div>
      <canvas v-drawhangman="val" height='80' width='150'></canvas>
  </div>
  `,
//<script>
// получает указанные в props данные val равные lives, привязанные в template App.vue

  name: 'componentcanvas',
  props: {
      val: Number
    },
    data() {
      return {
      }
    },
    computed: {
    },
    directives: {
      drawhangman: function(canvasElement, binding) {
        console.log("row21")
        let drawMe = binding.value;
        let ctx = canvasElement.getContext("2d");
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        console.log(ctx);

        let head = function(){
          ctx.beginPath();
          ctx.arc(30, 15, 5, 0, Math.PI*2, true);
          ctx.stroke();
        }

        let draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
          ctx.moveTo($pathFromx, $pathFromy);
          ctx.lineTo($pathTox, $pathToy);
          ctx.stroke();
        }

        let ground = function() {
          draw (0, 75, 75, 75);
        };

        let pole = function() {
          draw (5, 0, 5, 75);
        };

        let crossbar = function() {
          draw (0, 2, 35, 2);
        };

        let rope = function() {
          draw (30, 2, 30, 9);
        };

        let body = function() {
          draw (30, 20, 30, 37);
        };

        let rightArm = function() {
          draw (30, 25, 47, 31);
        };

        let leftArm = function() {
          draw (30, 25, 13, 31);
        };

        let rightLeg = function() {
          draw (30, 37, 40, 52);
        };

        let leftLeg = function() {
          draw (30, 37, 20, 52);
        };
        let drawArray = [rope, crossbar, pole, ground, rightLeg, leftLeg, rightArm, leftArm,  body,  head];
        switch (drawMe) {
          case 10:
            console.log("row78")
            ctx.clearRect(0, 0, 200, 200);
            break;
          case 9:
            head();
            break;
          case 8:
            body();
            break;
          case 7:
            leftArm();
            break;
          case 6:
            rightArm();
            break;
          case 5:
            leftLeg();
            break;
          case 4:
            rightLeg();
            break;
          case 3:
            ground();
            break;
          case 2:
            pole();
            break;
          case 1:
            crossbar();
            break;
          case 0:
            rope();
            break;
        }
      }
  }

//</script>
/*
<style scoped>
canvas {
  color: white;
  border: #fff dashed 2px;
  padding: 15px;
}
</style>
*/
};
