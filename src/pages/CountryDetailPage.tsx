import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Building2, Users, Coins, Globe2, MapPin } from "lucide-react";
import { useCountriesContext } from "../context/CountriesContext";
import { FavoriteButton } from "../components/FavoriteButton";
import { Tabs } from "../components/Tabs";
import { StatRow } from "../components/StatRow";
import { StateMessage } from "../components/StateMessage";
import { Loader } from "../components/Loader";
import { getFlagUrl, getFlagSvgUrl } from "../lib/flags";
import { REGION_LABELS, type Region } from "../types/country";

const numberFormatter = new Intl.NumberFormat("pt-PT");

const TABS = ["Visão geral", "Informações", "Bandeira", "Mapa"] as const;

function formatCurrencies(currencies: Record<string, { name: string; symbol?: string }>) {
  const values = Object.values(currencies);
  if (values.length === 0) return "—";
  return values.map((c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ""}`).join(", ");
}

export function CountryDetailPage() {
  const { code } = useParams<{ code: string }>();
  const { getByCode, status } = useCountriesContext();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Visão geral");

  if (status === "loading") {
    return (
      <div className="detail-page">
        <Loader />
      </div>
    );
  }

  const country = code ? getByCode(code) : undefined;

  if (!country) {
    return (
      <div className="simple-page">
        <StateMessage
          title="País não encontrado"
          description="O código na ligação não corresponde a nenhum país conhecido."
        />
        <p className="simple-page__footnote">
          <Link to="/">← Voltar a explorar países</Link>
        </p>
      </div>
    );
  }

  const capital = country.capital[0] ?? "Sem capital registada";
  const neighborNames = country.borders
    .map((borderCode) => getByCode(borderCode)?.name.common)
    .filter((name): name is string => Boolean(name));

  return (
    <div className="detail-page">
      <header className="detail-header">
        <div className="detail-header__bar">
          <Link to="/" className="detail-header__icon-button" aria-label="Voltar">
            <ArrowLeft size={20} strokeWidth={2} />
          </Link>
          <FavoriteButton cca3={country.cca3} countryName={country.name.common} />
        </div>

        <div className="detail-header__identity">
          <img
            src={getFlagUrl(country.cca2)}
            alt={`Bandeira de ${country.name.common}`}
            className="detail-header__flag"
          />
          <div>
            <h1>{country.name.common}</h1>
            <p>{country.name.official}</p>
          </div>
        </div>
      </header>

      <div className="detail-body">
        <Tabs tabs={[...TABS]} activeTab={activeTab} onChange={(tab) => setActiveTab(tab as (typeof TABS)[number])} />

        {activeTab === "Visão geral" && (
          <>
            <div className="stat-list">
              <StatRow icon={Building2} label="Capital" value={capital} />
              <StatRow icon={Users} label="População" value={numberFormatter.format(country.population)} />
              <StatRow icon={Coins} label="Moeda" value={formatCurrencies(country.currencies)} />
              <StatRow
                icon={Globe2}
                label="Região"
                value={REGION_LABELS[country.region as Region] ?? country.region}
              />
            </div>

            <section className="about-country">
              <h2>Sobre {country.name.common}</h2>
              <p>
                {country.name.common} fica na região de{" "}
                {REGION_LABELS[country.region as Region] ?? country.region}
                {country.subregion ? ` (${country.subregion})` : ""}, com uma população de
                aproximadamente {numberFormatter.format(country.population)} habitantes.
                {neighborNames.length > 0
                  ? ` Faz fronteira com ${neighborNames.join(", ")}.`
                  : " É um país insular ou sem fronteiras terrestres registadas."}
              </p>
            </section>
          </>
        )}

        {activeTab === "Informações" && (
          <div className="info-cards">
            <div className="info-card">
              <span>Idiomas oficiais</span>
              <strong>
                {Object.values(country.languages).length > 0
                  ? Object.values(country.languages).join(", ")
                  : "—"}
              </strong>
            </div>
            <div className="info-card">
              <span>Código do país</span>
              <strong>{country.cca2} / {country.cca3}</strong>
            </div>
            <div className="info-card">
              <span>Sub-região</span>
              <strong>{country.subregion || "—"}</strong>
            </div>
            <div className="info-card">
              <span>Países vizinhos</span>
              <strong>{neighborNames.length > 0 ? neighborNames.join(", ") : "Nenhum"}</strong>
            </div>
          </div>
        )}

        {activeTab === "Bandeira" && (
          <div className="flag-showcase">
            <img src={getFlagSvgUrl(country.cca2)} alt={`Bandeira de ${country.name.common}`} />
            <p className="flag-showcase__emoji" aria-hidden="true">{country.flagEmoji}</p>
          </div>
        )}

        {activeTab === "Mapa" && (
          <div className="map-tab">
            {country.latlng.length === 2 ? (
              <>
                <p>
                  <MapPin size={16} strokeWidth={2} aria-hidden="true" /> Coordenadas
                  aproximadas: {country.latlng[0].toFixed(2)}, {country.latlng[1].toFixed(2)}
                </p>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${country.latlng[0]}&mlon=${country.latlng[1]}&zoom=5`}
                  target="_blank"
                  rel="noreferrer"
                  className="map-tab__link"
                >
                  Ver no OpenStreetMap
                </a>
              </>
            ) : (
              <p>Sem coordenadas disponíveis para este país.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
