// Declare and initialize variables
var num = 0;
var ans = 0;
var opr = ' ';
var state = 0;
var mode = "INFIX";


function calculate(key) {
  switch(state) {
    // state00: Calculates ans
    case 0:
      if (key == ' ' || key == '-' || key == '+' || key == '*' || key == '/') {
        opr = key;
      }
      else if (key == '0' || key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9') {
        document.getElementById("txtbx").value = key;
        num = document.getElementById("txtbx").value;
        state = 1;
      }
      else if (key == '.') {
        document.getElementById("txtbx").value = "0.";
        num = document.getElementById("txtbx").value;
        state = 2;
      }
      break;


    // state01: Displaying and accumulating num
    case 1:
      if (key == ' ' || key == '-' || key == '+' || key == '*' || key == '/') {
        document.getElementById("txtbx").value = calculateAns();
        opr = key;
        state = 0;
      }
      else if (key == '0' || key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9' || key == '.') {
        document.getElementById("txtbx").value += key;
        num = document.getElementById("txtbx").value;
        if (key == '.') {
          state = 2;
        }
      }
      break;

    // state02: Displays and accumulates digits for decimal case
    case 2:
      if (key == ' ' || key == '-' || key == '+' || key == '*' || key == '/') {
        document.getElementById("txtbx").value = calculateAns();
        opr = key;
        state = 0;
      }
      else if (key == '0' || key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9') {
        document.getElementById("txtbx").value += key;
        num = document.getElementById("txtbx").value;
      }
      break;

  }


  console.log("\nstate=" + state + ", key=" + key);
  console.log("ans=" + ans);
  console.log("num=" + num);
  console.log("opr=" + opr);
}




// Helper function
function calculateAns() {
    if (opr == ' ') {
      ans = num;
    }
    else if (opr == '-') {
      ans = parseFloat(ans) - parseFloat(num);
    }
    else if (opr == '+') {
      ans = parseFloat(ans) + parseFloat(num);
    }
    else if (opr == '*') {
      ans = parseFloat(ans) * parseFloat(num);
    }
    else if (opr == '/') {
      ans = parseFloat(ans) / parseFloat(num);
    }
    return ans;
}


function switchMode(x) {
  if (mode != x) {
    document.getElementById("INFIX").disabled = false;
    document.getElementById("RPN").disabled = false;
    document.getElementById(x).disabled = true;
    mode = x;

    console.log("Changed mode to " + x);

    // Reset calculator values
    num = 0;
    ans = 0;
    opr = ' ';
    state = 0;

    calculate(' ');
    // Delete later once RPN is implemented
    document.getElementById("txtbx").value = ans;
  }
}
