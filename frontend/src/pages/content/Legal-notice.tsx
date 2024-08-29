import React from "react";
import Layout from "@/layouts/Layout";

export default function Legal_notice() {
    return (
        <Layout>
            <div className="px-60 xl:mx-24 xl:pb-5">
                <h1 className="text-3xl font-bold mb-6">Mentions Légales</h1>
                <p className="mb-4"><strong>Éditeur du site :</strong></p>
                <p className="mb-4">
                    Nom de l&apos;entreprise : GearGo<br />
                    Forme juridique : Société à Responsabilité Limitée (SARL)<br />
                    Capital social : 2 000 000]<br />
                    Siège social : Paris<br />
                    Numéro SIRET : 1092412094<br />
                    Numéro de TVA intracommunautaire : 18<br />
                    Adresse e-mail : contact@geargo.com<br />
                    Numéro de téléphone : 09 87 65 43 21<br />
                </p>

                <p className="mb-4"><strong>Directeur de la publication :</strong></p>
                <p className="mb-4">
                    Dimitri Nonchalan<br />
                    E-mail : dnonchalan@gmail.fr<br />
                </p>

                <p className="mb-4"><strong>Hébergement du site :</strong></p>
                <p className="mb-4">
                    Nom de l&apos;hébergeur : Wild code school VPS<br />
                    Adresse de l&apos;hébergeur : Paris 80 des marée<br />
                    Numéro de téléphone : 09 00 01 03 39<br />
                    Site Web : https://1123-bleu-4.wns.wilders.dev/
                </p>

                <p className="mb-4"><strong>Propriété intellectuelle :</strong></p>
                <p className="mb-4">
                    L&apos;ensemble du contenu présent sur le site GearGo, incluant, de manière non limitative,
                    les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur
                    mise en forme, sont la propriété exclusive de GearGo à l&apos;exception des marques, logos ou
                    contenus appartenant à d&apos;autres sociétés partenaires ou auteurs. Toute reproduction,
                    distribution, modification, adaptation, retransmission ou publication, même partielle, de ces
                    différents éléments est strictement interdite sans l&apos;accord exprès par écrit de GearGo.
                    Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une contrefaçon
                    sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
                </p>

                <p className="mb-4"><strong>Responsabilité :</strong></p>
                <p className="mb-4">
                    Les informations fournies sur le site GearGo sont présentées à titre indicatif et général.
                    GearGo s&apos;efforce de les maintenir exactes et à jour, mais ne saurait garantir
                    l&apos;exactitude, la complétude ou l&apos;actualité des informations. L&apos;utilisateur
                    assume pleinement les risques liés à la consultation des informations sur le site. GearGo
                    ne saurait être tenu responsable des dommages directs ou indirects résultant de
                    l&apos;utilisation du site ou de l&apos;impossibilité d&apos;y accéder.
                </p>

                <p className="mb-4"><strong>Liens hypertextes :</strong></p>
                <p className="mb-4">
                    Le site GearGo peut contenir des liens hypertextes vers d&apos;autres sites internet.
                </p>
            </div>
        </Layout>
    );
}