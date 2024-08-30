import React from "react";
import Layout from "@/layouts/Layout";

export default function ConditionsGeneralesVente() {
    return (
        <Layout>
            <div className="px-60 xl:mx-24 xl:pb-5">
                <h1 className="text-3xl font-bold mb-6">Conditions Générales de Vente</h1>

                <p className="mb-4"><strong>Article 1 : Objet</strong></p>
                <p className="mb-4">
                    Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre
                    la société GearGo (le « Vendeur ») et toute personne physique ou morale (le « Client ») souhaitant
                    louer des équipements de sport via le site internet GearGo. En passant commande, le Client accepte
                    sans réserve les présentes CGV.
                </p>

                <p className="mb-4"><strong>Article 2 : Produits</strong></p>
                <p className="mb-4">
                    Les produits proposés à la location sont décrits et présentés avec la plus grande exactitude possible.
                    Toutefois, si des erreurs ou omissions se produisent dans cette présentation, la responsabilité de GearGo
                    ne pourra être engagée. Les photographies des produits ne sont pas contractuelles.
                </p>

                <p className="mb-4"><strong>Article 3 : Commande</strong></p>
                <p className="mb-4">
                    Le Client passe commande en ligne via le site GearGo. La commande ne sera validée qu'après acceptation
                    du paiement. GearGo se réserve le droit d'annuler ou de refuser toute commande d'un Client avec lequel
                    il existerait un litige relatif au paiement d'une commande antérieure.
                </p>

                <p className="mb-4"><strong>Article 4 : Tarifs et Paiement</strong></p>
                <p className="mb-4">
                    Les prix des produits sont indiqués en euros, toutes taxes comprises (TTC). Le paiement s'effectue en
                    ligne par carte bancaire via un système sécurisé. GearGo se réserve le droit de modifier ses prix
                    à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la
                    validation de la commande.
                </p>

                <p className="mb-4"><strong>Article 5 : Livraison</strong></p>
                <p className="mb-4">
                    Les produits loués sont livrés à l'adresse indiquée par le Client lors de la commande. Les délais de
                    livraison sont donnés à titre indicatif et GearGo ne saurait être tenu responsable des retards éventuels.
                    En cas de non réception de la commande, le Client doit contacter GearGo dans les plus brefs délais.
                </p>

                <p className="mb-4"><strong>Article 6 : Utilisation des Produits</strong></p>
                <p className="mb-4">
                    Le Client s'engage à utiliser les produits loués conformément à leur destination. Il est responsable
                    de l'entretien et de la conservation des produits pendant la durée de la location. Toute détérioration
                    ou perte des produits loués engage la responsabilité du Client qui devra en assumer les coûts de
                    réparation ou de remplacement.
                </p>

                <p className="mb-4"><strong>Article 7 : Rétractation</strong></p>
                <p className="mb-4">
                    Conformément à la législation en vigueur, le Client dispose d'un délai de 14 jours à compter de la
                    réception des produits pour exercer son droit de rétractation. Pour exercer ce droit, le Client doit
                    notifier GearGo de sa décision par écrit et retourner les produits dans leur état d'origine.
                    Les frais de retour sont à la charge du Client.
                </p>

                <p className="mb-4"><strong>Article 8 : Responsabilité</strong></p>
                <p className="mb-4">
                    GearGo ne saurait être tenu responsable des dommages de toute nature, tant matériels qu'immatériels ou
                    corporels, qui pourraient résulter d'une mauvaise utilisation des produits loués. La responsabilité de
                    GearGo sera, en tout état de cause, limitée au montant de la commande.
                </p>

                <p className="mb-4"><strong>Article 9 : Données Personnelles</strong></p>
                <p className="mb-4">
                    GearGo s'engage à respecter la confidentialité des données personnelles communiquées par le Client
                    lors de la commande et à les traiter conformément à la législation en vigueur. Le Client dispose
                    d'un droit d'accès, de modification et de suppression des données le concernant.
                </p>

                <p className="mb-4"><strong>Article 10 : Loi Applicable et Juridiction</strong></p>
                <p className="mb-4">
                    Les présentes CGV sont soumises à la loi française. Tout litige relatif à leur interprétation et/ou
                    à leur exécution relève des tribunaux français compétents.
                </p>

            </div>
        </Layout>
    );
}
