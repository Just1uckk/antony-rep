import { createGlobalStyle } from 'styled-components'
import MADEEvolveSansRegular from "./fonts/MADEEvolveSansRegular.woff";
import MADEEvolveSansRegular2 from "./fonts/MADEEvolveSansRegular2.woff2";
import MADEEvolveSansBold from "./fonts/MADEEvolveSansBold.woff";
import MADEEvolveSansBold2 from "./fonts/MADEEvolveSansBold2.woff2";
import MADEEvolveSansLight from "./fonts/MADEEvolveSansLight.woff";
import MADEEvolveSansLight2 from "./fonts/MADEEvolveSansLight2.woff2";
import MADEEvolveSansMedium from "./fonts/MADEEvolveSansMedium.woff";
import MADEEvolveSansMedium2 from "./fonts/MADEEvolveSansMedium2.woff2";
import reset from "./css/reset.css"


const GlobalStyle = createGlobalStyle`

@import url(${reset}); 

  @font-face {
    font-family: 'MADEEvolveSans Regular' sans-serif;
    src: url(${MADEEvolveSansRegular2}) format("woff2"), url(${MADEEvolveSansRegular}) format("woff");
    font-weight: 400;
	  font-style: normal;
	  font-display: swap;
}
@font-face {
    font-family: 'MADEEvolveSans Bold' sans-serif;
    src: url(${MADEEvolveSansBold2}) format("woff2"), url(${MADEEvolveSansBold}) format("woff");
    font-weight: 700;
	  font-style: normal;
	  font-display: swap;
}
@font-face {
    font-family: 'MADEEvolveSans Light' sans-serif;
    src: url(${MADEEvolveSansLight2}) format("woff2"), url(${MADEEvolveSansLight}) format("woff");
    font-weight: 300;
	  font-style: normal;
	  font-display: swap;
}
@font-face {
    font-family: 'MADEEvolve Medium' sans-serif;
    src: url(${MADEEvolveSansMedium2}) format("woff2"), url(${MADEEvolveSansMedium}) format("woff");
    font-weight: 500;
	  font-style: normal;
	  font-display: swap;
}

* {
  font-family: "MADEEvolve", sans-serif;
	font-size: 16px;
	font-weight: 400;
  line-height: 1;
}

h1 {
  font-family: "MADEEvolve", sans-serif;
	font-size: 40px;
	font-weight: 700;
  height: 37px;
  color: white;
  letter-spacing: -1px;
}

h3 {
  font-family: "MADEEvolve", sans-serif;
	font-size: 15px;
	font-weight: 300;
  color: white;
}

h2 {
  font-family: "MADEEvolve", sans-serif;
	font-size: 20px;
	font-weight: 500;
  color: #6c757d;
  padding-top: 2px;
}

`;

export default GlobalStyle
