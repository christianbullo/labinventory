import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
    return (
        <React.Fragment>
            <div class="container">
                <div>
                    <hr/>
                </div>
                <div>
                    <br/>
                </div>
            </div>
            <footer>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col col-xl-3 col-sm-2 vertical-line">
                            <h6>EXPLORE</h6>
                            <ul class="list-unstyled">
                                <li><a href="http://biology.unm.edu/" target="_blank" class="text-dark">UNM Biology</a></li>
                                <li><a href="https://ceti.unm.edu/" target="_blank" class="text-dark">UNM CETI</a></li>
                                <li><a href="https://isdci.org/" target="_blank" class="text-dark">ISDCI</a></li>
                            </ul>
                        </div>
                        <div class="col col-xl-3 col-sm-2 vertical-line">
                            <h7>FOLLOW</h7>
                            <ul class="list-unstyled">
                                <li><a href="https://sites.google.com/site/irenesalinasremiro/about-me" target="_blank" class="text-dark"><i class="fa fa-rss"></i></a></li>
                                <li><a href="https://twitter.com/drsalinaslab" target="_blank" class="text-dark"><i class="fa fa-twitter"></i></a></li>
                            </ul>
                        </div>
                        <div class="col col-xl-3 col-sm-2 vertical-line">
                            <h7>CREDITS &copy;</h7>
                            <ul class="list-unstyled">
                                <li><a href="https://www.linkedin.com/in/christianbullo" target="_blank" class="text-dark"><i class="fa fa-rss"></i></a></li>
                                <li><a href="https://twitter.com/christian_bullo" target="_blank" class="text-dark"><i class="fa fa-twitter"></i></a></li>
                            </ul>
                        </div>
                        <div class="vertical-line"></div>
                    </div>
                    <div class="row">
                        <br />
                        <br />
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
}

export default Footer;