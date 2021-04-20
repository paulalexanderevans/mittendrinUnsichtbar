import React from "react";

export default class Kontakt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    render() {
        return (
            <div className="kontakt">
                <div className="kontaktTxt">
                    <h1>
                        Das Projekt ist als Bachelorprojekt an der Universität
                        der Künste Berlin in Visueller Kommunikation entstanden.
                        <br></br>
                        <br></br>
                        Interessent*innen, Buchverlage, Sponsoren,
                        Galerist*innen, Vereine:
                        <br />
                        Meldet Euch gerne für eine Zusammenarbeit, um den Frauen
                        noch mehr Sichtbarkeit zu geben und über die Thematik
                        mehr Aufmerksamkeit zu schaffen. <br></br>
                        Eine erste physische Ausstellung wird in Zusammenarbeit
                        mit dem Strassenfeger e.V. im Sommer 2021 stattfinden.
                        Genauere Informationen werden sobald als möglich hier
                        vermerkt.
                        <br></br>
                        <br></br>Konzept & Gestaltung
                        <br />
                        Ronja Lang
                        <br />
                        <a href="mailto:r.lang@udk-berlin.de">
                            r.lang@udk-berlin.de
                        </a>
                        <br></br>
                        <br></br>Code
                        <br />
                        Paul Evans
                        <br />
                        <a href="mailto:paulalexanderevans@live.com">
                            paulalexanderevans@live.com
                        </a>
                    </h1>
                </div>
            </div>
        );
    }
}
