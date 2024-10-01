import React from "react";
import Layout from "@/layouts/Layout";

export default function LEntreprise() {
    return (
        <Layout>
            <div className="px-60 xl:mx-24 xl:pb-5">
                <h1 className="text-3xl font-bold mb-6">À propos de GearGo</h1>

                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
                    <p className="mb-4">
                        Chez GearGo, nous sommes passionnés par l&apos;idée de connecter les amateurs de sport avec l&apos;équipement dont ils ont besoin pour leurs aventures. Notre mission est de rendre le matériel sportif de haute qualité accessible à tous grâce à une plateforme de location en ligne facile à utiliser et efficace.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Notre Histoire</h2>
                    <p className="mb-4">
                        GearGo est né de la collaboration entre une entreprise établie de location d&apos;équipements sportifs et une équipe de développeurs innovants. Reconnaissant le besoin d&apos;une solution numérique moderne dans l&apos;industrie de la location sportive, nous avons entrepris de créer une plateforme qui révolutionnerait la façon dont les gens accèdent et profitent du matériel sportif.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Ce que nous offrons</h2>
                    <ul className="list-disc list-inside mb-4">
                        <li>Une large gamme d&apos;équipements sportifs de haute qualité à louer</li>
                        <li>Un système de réservation en ligne simple et facile</li>
                        <li>Des périodes de location flexibles adaptées à vos besoins</li>
                        <li>Des conseils d&apos;experts pour choisir le bon équipement</li>
                        <li>Des options pratiques de prise en charge et de retour</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Notre Équipe</h2>
                    <p className="mb-4">
                        Derrière GearGo se trouve une équipe dévouée d&apos;enthousiastes du sport et d&apos;experts en technologie. Nous combinons notre passion pour les activités de plein air avec une technologie de pointe pour vous offrir la meilleure expérience de location possible.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Informations de Contact</h2>
                    <p className="mb-4">
                        Nom de l&apos;entreprise : GearGo<br />
                        Forme juridique : Société à Responsabilité Limitée (SARL)<br />
                        Siège social : Paris<br />
                        E-mail : contact@geargo.com<br />
                        Téléphone : 09 87 65 43 21<br />
                    </p>
                </section>
            </div>
        </Layout>
    );
}