// https://easings.net/
// https://sighack.com/post/easing-functions-in-processing

// easing map function
function map2(value, start1, stop1, start2, stop2) {
  let type = "QUADRATIC";
  let when = "EASE_IN_OUT";
  let b = start2;
  let c = stop2 - start2;
  let t = value - start1;
  let d = stop1 - start1;
  let p = 0.5;
  switch (type) {
    case "LINEAR":
      return (c * t) / d + b;
    case "SQRT":
      if (when == "EASE_IN") {
        t /= d;
        return c * pow(t, p) + b;
      } else if (when == "EASE_OUT") {
        t /= d;
        return c * (1 - pow(1 - t, p)) + b;
      } else if (when == "EASE_IN_OUT") {
        t /= d / 2;
        if (t < 1) return (c / 2) * pow(t, p) + b;
        return (c / 2) * (2 - pow(2 - t, p)) + b;
      }
      break;
    case "QUADRATIC":
      if (when == "EASE_IN") {
        t /= d;
        return c * t * t + b;
      } else if (when == "EASE_OUT") {
        t /= d;
        return -c * t * (t - 2) + b;
      } else if (when == "EASE_IN_OUT") {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      }
      break;
    case "CUBIC":
      if (when == "EASE_IN") {
        t /= d;
        return c * t * t * t + b;
      } else if (when == "EASE_OUT") {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
      } else if (when == "EASE_IN_OUT") {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      }
      break;
    case "QUARTIC":
      if (when == "EASE_IN") {
        t /= d;
        return c * t * t * t * t + b;
      } else if (when == "EASE_OUT") {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
      } else if (when == "EASE_IN_OUT") {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t * t + b;
        t -= 2;
        return (-c / 2) * (t * t * t * t - 2) + b;
      }
      break;
    case "QUINTIC":
      if (when == "EASE_IN") {
        t /= d;
        return c * t * t * t * t * t + b;
      } else if (when == "EASE_OUT") {
        t /= d;
        t--;
        return c * (t * t * t * t * t + 1) + b;
      } else if (when == "EASE_IN_OUT") {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t * t * t + 2) + b;
      }
      break;
    case "SINUSOIDAL":
      if (when == "EASE_IN") {
        return -c * cos((t / d) * (PI / 2)) + c + b;
      } else if (when == "EASE_OUT") {
        return c * sin((t / d) * (PI / 2)) + b;
      } else if (when == "EASE_IN_OUT") {
        return (-c / 2) * (cos((PI * t) / d) - 1) + b;
      }
      break;
    case "EXPONENTIAL":
      if (when == "EASE_IN") {
        return c * pow(2, 10 * (t / d - 1)) + b;
      } else if (when == "EASE_OUT") {
        return c * (-pow(2, (-10 * t) / d) + 1) + b;
      } else if (when == "EASE_IN_OUT") {
        t /= d / 2;
        if (t < 1) return (c / 2) * pow(2, 10 * (t - 1)) + b;
        t--;
        return (c / 2) * (-pow(2, -10 * t) + 2) + b;
      }
      break;
    case "CIRCULAR":
      if (when == "EASE_IN") {
        t /= d;
        return -c * (sqrt(1 - t * t) - 1) + b;
      } else if (when == "EASE_OUT") {
        t /= d;
        t--;
        return c * sqrt(1 - t * t) + b;
      } else if (when == "EASE_IN_OUT") {
        t /= d / 2;
        if (t < 1) return (-c / 2) * (sqrt(1 - t * t) - 1) + b;
        t -= 2;
        return (c / 2) * (sqrt(1 - t * t) + 1) + b;
      }
      break;
  }
  return 0;
}
