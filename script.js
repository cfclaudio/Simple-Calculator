// Declare and initialize variables with deafult values
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
        if(mode == "INFIX") {
          opr = key;
        }
      }
      else if (key == '0' || key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9') {
        updateDisplay(key);
        state = 1;
      }
      else if (key == '.') {
        updateDisplay("0.");
        state = 2;
      }
      break;


    // state01: Displaying and accumulating num
    case 1:
      if (key == ' ' || key == '-' || key == '+' || key == '*' || key == '/') {
        if (mode == "RPN") {
          if (document.getElementById("ENTER").disabled == true) {
            opr = key;
            document.getElementById("txtbx").value = calculateAns();
            state = 0;
          }
        }
        else if (mode == "INFIX") {
          document.getElementById("txtbx").value = calculateAns();
          opr = key;
          state = 0;
        }
      }
      else if (key == '0' || key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9' || key == '.') {
        updateDisplay(num + key);
        if (key == '.') {
          state = 2;
        }
      }
      else if (key == "ENTER") {
        alert("ENTER HAS BEEN PRESSED");
        ans = num;
        document.getElementById("ENTER").disabled = true;
        state = 3;
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
        updateDisplay(num + key);
      }
      break;

      // state03: This state is only used when in RPN mode
    case 3:
      if (key == '0' || key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9') {
        updateDisplay(key);
        state = 1;
      }
      else if (key == '.') {
        updateDisplay("0.");
        state = 2;
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

function updateDisplay(disp_num) {
  document.getElementById("txtbx").value = disp_num;
  num = document.getElementById("txtbx").value;
}


function switchMode(x) {
  if (mode != x) {
    document.getElementById("INFIX").disabled = false;
    document.getElementById("RPN").disabled = false;
    document.getElementById(x).disabled = true;

    mode = x;
    console.log("Changed mode to " + x);

    // Reset calculator values
    if(mode == "RPN") {
      document.getElementById("ENTER").disabled = false;
      state = 1;
    }
    else {
      document.getElementById("ENTER").disabled = true;
      state = 0;
    }
    num = 0;
    ans = 0;
    opr = ' ';
    document.getElementById("txtbx").value = ans;
  }
}
