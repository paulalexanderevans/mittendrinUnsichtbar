import { BrowserRouter, Route } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import React from "react";

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    render() {
        return (
            <div className="about">
                <div className="aboutTxt">
                    <h1>
                        ` Der Gedanke an eine wohnungslose Person ergibt oft ein
                        sehr stigmatisiertes Bild: Ein Mann mit abgetragener
                        Kleidung, der auf der Straße lebt. Dieses vereinfachte
                        Bild der sichtbaren Wohnungslosigkeit steht oft in
                        Verbindung mit gesellschaftlichen Sehkonventionen und
                        wird durch Medien zum Beispiel mit Porträts der
                        Betroffenen verbreitet und verstärkt. Durch solch eine
                        Verzerrung der Wahrnehmung bleiben viele Betroffene
                        unbemerkt: Es sind Frauen, die aus Scham wegen ihrer
                        Notlage und zum Schutz vor Gewalt unauffällig leben und
                        ihre Wohnungslosigkeit verdeckt halten. Betroffene
                        Frauen suchen meist Notübernachtungen auf, um einen
                        sicheren Ort zum Schlafen zu finden. Tagsüber ist ihnen
                        dieser Schutz nicht geboten, da sie die Einrichtungen
                        frühmorgens verlassen müssen. Im Stadtbild fallen sie
                        durch ihr optisches Erscheinungsbild nicht auf und
                        existieren somit kaum in der gesellschaftlichen
                        Wahrnehmung. Sie sind mittendrin – aber unsichtbar.
                        Durch einen Perspektivenwechsel mittels Einwegkameras
                        dokumentieren 13 wohnungslose Frauen ihr alltägliches
                        Leben, um einen Einblick in ihre Lebenssituation zu
                        geben. Sie bleiben auf Wunsch anonym und werden
                        lediglich mit dem Anfangsbuchstaben ihres Vornamens
                        abgekürzt.<br></br>
                        <br></br>Die Suche nach den Frauen war mit sehr vielen
                        Besuchen in verschiedenen Notübernachtungen in Berlin
                        verbunden. Ich bedanke mich bei allen Leiterinnen für
                        ihre hilfsbereite Unterstützung, die Einrichtungen
                        mehrmals besuchen zu können: Christin Fritzsche
                        ("Notübernachtung für Frauen", GEBEWO pro), Isabelle
                        Ponesicky ("Notübernachtung für Frauen", Neue Chance),
                        Elisa Lindemann ("Marie", Koepjohann'sche Stiftung),
                        Elke Loos ("Mitten im Kiez", AWO Berlin Spree-Wuhle),
                        Natalie Kulik ("Evas Obdach", Sozialdienst katholischer
                        Frauen e.V.), Felina Beyer ("JugendKulturZentrum Pumpe",
                        AWO Berlin Mitte).<br></br>Mein besonderer Dank gilt
                        allen Frauen für die Teilnahme an dem Projekt. Ich
                        bedanke mich für ihre Offenheit, ihre Wärme und ihr
                        Vertrauen.`
                    </h1>
                </div>
            </div>
        );
    }
}
