const { Sequelize, Model} = require("sequelize")

module.exports = (Sequelize, DataTypes) =>{
    class Table extends Model {}

    Table.init(
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            nev:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            jel:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            def:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            mer:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            alkat_id:{
                type: DataTypes.INTEGER,
                allowNull:false
            }
        },
        {
            sequelize: Sequelize,
            modelName: 'Table',
            tableName: 'Tablak',
            timestamps: false,
        }
    )

    Table.initializeTable = async () => {
        const Tables = [
            { nev: 'Helyvektor', jel: '$\\vec{r}$ (r vektor)', def: 'irányított szakasz', mer: 'méter (m)', alkat_id: 1 },
            { nev: 'Elmozdulás', jel: '$\\Delta\\vec{r}$ (delta er)', def: '$\\vec{x}$<sub>1</sub>-$\\vec{x}$<sub>2</sub>', mer: 'méter (m)', alkat_id: 1 },
            { nev: 'Idő', jel: 't', def: 'alapmennyiség', mer: 'secundum (sec)', alkat_id: 1 },
            { nev: 'Eltelt idő', jel: '$\\Delta t$ (delta té)', def: 't<sub>2</sub>-t<sub>1</sub>', mer: 'secundum (sec)', alkat_id: 1 },
            { nev: 'Sebesség', jel: '$\\vec{v}$', def: '$(\\Delta \\vec{r})/(\\Delta t)$', mer: '$(méter)/(sec)$', alkat_id: 1 },
            { nev: 'Sebességváltozás', jel: '$\\Delta\\vec{v}$ (v vektor)', def: '$\\vec{v}$<sub>2</sub>-$\\vec{v}$<sub>1</sub>', mer: '$(méter)/(sec)$', alkat_id: 1 },
            { nev: 'Gyorsulás', jel: 'a (a vektor)', def: '$(\\Delta \\vec{v})/(\\Delta t)$', mer: '$m/s^2$', alkat_id: 1 },
            { nev: 'Forgásszög', jel: '$\\varphi$ (fi)', def: 'a síkszög ívmértéke', mer: 'radián (rad)', alkat_id: 2 },
            { nev: 'Szögelfordulás', jel: '$\\Delta\\varphi$', def: '$\\varphi$<sub>2</sub>-$\\varphi$<sub>1</sub>', mer: 'radián (rad)', alkat_id: 2 },
            { nev: 'Szögsebesség', jel: '$\\omega$ (ómega)', def: '$(\\Delta\\varphi)/(\\Delta t)$', mer: '$(radián)/sec$', alkat_id: 2 },
            { nev: 'A szögsebesség megváltozása', jel: '$\\Delta\\omega$', def: '$\\omega$<sub>2</sub>-$\\omega$<sub>1</sub>', mer: '$(radián)/sec$', alkat_id: 2 },
            { nev: 'Szöggyorsulás', jel: '$\\beta$ (béta)', def: '$(\\Delta\\varphi)/(\\Delta t)$', mer: '$(radián)/sec^2$', alkat_id: 2 },
            { nev: 'Tömeg', jel: 'm', def: 'alapmennyiség', mer: 'kg', alkat_id: 3 },
            { nev: 'Impulzus (lendület)', jel: 'I, (p)', def: 'm$*$v', mer: 'kg$*m/s$', alkat_id: 3 },
            { nev: 'Lendületváltozás', jel: '$\\Delta I$', def: 'I<sub>2</sub>-I<sub>1</sub>', mer: '$kg * m/s$', alkat_id: 3 },
            { nev: 'Erő', jel: 'F', def: '$(\\Delta I)/(\\Delta t)$', mer: 'kg$*m/s^2$=Newton', alkat_id: 3 },
            { nev: 'Nehézségi gyorsulás', jel: 'g', def: 'm$*$g', mer: 'Newton (N)', alkat_id: 3 },
            { nev: 'Súrlódási együttható', jel: '$\\mu$ (mű)', def: 'értéke táblázatban adott', mer: 'nincs', alkat_id: 3 },
            { nev: 'Csúszási együttható', jel: '$\\mu$ (mű)', def: 'értéke táblázatban adott', mer: 'nincs', alkat_id: 3 },
            { nev: 'Tapadási együttható', jel: '$\\mu$ (mű)', def: 'értéke táblázatban adott', mer: 'nincs', alkat_id: 3 },
            { nev: 'Súrlódási erő', jel: 'F<sub>s</sub>', def: '$\\mu \\cdot F_{\\text{nyomó}}$', mer: 'Newton', alkat_id: 3 },
            { nev: 'Erőkar', jel: 'k', def: 'A forgástengely távolsága az erő hatásvonalától', mer: 'méter (m)', alkat_id: 3 },
            { nev: 'Perdület', jel: 'N', def: '$\\Theta \\cdot \\omega$', mer: 'kg^2*m/s', alkat_id: 3 },
            { nev: 'Perdület változás', jel: '$\\Delta N$', def: 'N<sub>2</sub>-N<sub>1</sub>', mer: 'kg^2*m/s', alkat_id: 3 },
            { nev: 'Forgatónyomaték', jel: 'M', def: '$(\\Delta N)/(\\Delta t)$ - $(F \\cdot k)$', mer: 'Newton$*$méter (Nm)', alkat_id: 3 },
            { nev: 'Tehetetlenségi nyomaték', jel: '$\\Theta$', def: 'képlete táblázatban', mer: 'kg$*m^2$', alkat_id: 3 },
            { nev: 'Az út', jel: 's', def: 'a pálya egy szakaszának az ívhossza', mer: 'méter (m)', alkat_id: 4 },
            { nev: 'Az erő munkája', jel: 'W', def: 'F$*$s - $(F \\cdot \\Delta r)$', mer: 'N$*$m=Joule(J)', alkat_id: 4 },
            { nev: 'Haladási energia', jel: 'E<sub>h</sub>', def: '$\\frac{1}{2} m v^2$', mer: 'N$*$m=Joule(J)', alkat_id: 4 },
            { nev: 'Forgási energia', jel: 'E<sub>forg</sub>', def: '$\\frac{1}{2} \\Theta \\omega^2$', mer: 'N$*$m=Joule(J)', alkat_id: 4 },
            { nev: 'Hosszúság', jel: 'l', def: 'alapmennyiség', mer: 'méter (m)', alkat_id: 4 },
            { nev: 'Hosszváltozás (megnyúlás)', jel: '$\\Delta l$ (delta el)', def: 'l<sub>2</sub>-l<sub>1</sub>', mer: 'méter (m)', alkat_id: 4 },
            { nev: 'Rugóenergia', jel: 'E<sub>rugó</sub>', def: '$\\frac{1}{2} D (\\Delta l)^2$', mer: 'N$*$m=Joule(J)', alkat_id: 4 },
            { nev: 'Magasság', jel: 'h', def: 'a nullszinttől mért függőleges távolság', mer: 'méter (m)', alkat_id: 4 },
            { nev: 'Helyzeti energia(gravitációs potenciális energia)', jel: 'E<sub>p</sub>', def: '$mg * h$', mer: 'N$*$m=Joule(J)', alkat_id: 4 },
            { nev: 'Teljesítmény', jel: 'P (nagy pé)', def: '$W\\ / (\\Delta t)$', mer: 'J/sec=Watt (W)', alkat_id: 4 },
            { nev: 'Hatásfok', jel: '$\\eta$', def: '$\\frac{W_{h}}{W_{b}}$', mer: 'nincs', alkat_id: 4 },
            { nev: 'Felszín (terület)', jel: 'A', def: 'alakfüggő', mer: 'm^2 (m^2)', alkat_id: 5 },
            { nev: 'Térfogat', jel: 'V', def: 'alakfüggő', mer: 'm^3 (m^3)', alkat_id: 5 },
            { nev: 'Sűrűség', jel: '$\\rho$', def: 'm/v', mer: 'kg/m^3', alkat_id: 5 },
            { nev: 'Nyomás', jel: 'p (kis pé)', def: '$\\frac{F}{A}$ nyomó erő/nyomott terület', mer: 'N/m^2=pascal (Pa)', alkat_id: 5 },
            { nev: 'Keringési idő (periódusidő)', jel: 'T', def: 'a visszatéréshez szükséges idő', mer: 'secundum (s)', alkat_id: 6 },
            { nev: 'Fordulatszám (frekvencia)', jel: 'f,$\\nu$', def: '$1/T$', mer: '1/sec=Hertz (Hz)', alkat_id: 6 },
            { nev: 'Hullámhossz', jel: '$\\lambda$ (lambda)', def: 'az azonos fázisú szomszédok távolsága', mer: 'méter (m)', alkat_id: 6 },
            { nev: 'Terjedési sebesség', jel: 'c', def: 'a rezgésállapot haladási sebessége', mer: 'm/s', alkat_id: 6 },
            { nev: 'Pillanatnyi kitérés', jel: 'x,y', def: 'Az egyensúlyi helyzettől mért előjeles távolság', mer: 'méter (m)', alkat_id: 6 },
            { nev: 'Amplitúdó', jel: 'A', def: 'Maximális kitérés', mer: 'méter (m)', alkat_id: 6 },
            { nev: 'Körfrekvencia', jel: '$\\omega$', def: '$(2\\pi)/T$', mer: '(rad)/(sec)', alkat_id: 6 },
            { nev: 'Keringési / körül fordulási idő', jel: 'T', def: 'Egy teljes keringéshez / körül forduláshoz szükséges idő', mer: 'secundum', alkat_id: 6 },
            { nev: 'Idő', jel: 't', def: 'alapmennyiség', mer: 'secundum', alkat_id: 6 },
            { nev: 'Sebesség', jel: 'v', def: '$(\\Delta r)/(\\Delta t)$', mer: '(méter)/(sec)', alkat_id: 6 },
            { nev: 'Gyorsulás', jel: 'a', def: '$(\\Delta v)/(\\Delta t)$', mer: '(méter)/(sec)^2', alkat_id: 6 },
            { nev: 'Rezgésidő / Lengésidő', jel: 'T', def: 'Egy teljes lengéshez / rezgéshez szükséges idő', mer: 'secundum', alkat_id: 6 },
            { nev: 'Tömeg', jel: 'm', def: 'alapmennyiség', mer: 'kilogramm', alkat_id: 6 },
            { nev: 'Rugóállandó', jel: 'D', def: '$\\frac{F}{\\Delta I}$', mer: '(N)/(méter)', alkat_id: 6 },
            { nev: 'Hosszúság', jel: 'I', def: 'alapmennyiség', mer: 'méter (m)', alkat_id: 6 },
            { nev: 'Megnyúlás', jel: '$\\Delta I$', def: 'I<sub>2</sub>-I<sub>1</sub>', mer: 'méter (m)', alkat_id: 6 },
            { nev: 'Nehézségi gyorsulás', jel: 'g', def: 'A szabadon eső test sebességének változási gyorsasága', mer: '(méter)/sec^2', alkat_id: 6 },
            { nev: 'A tömegközépponti tengelyre vonatkoztatott tehetetlenségi nyomaték', jel: '$\\Theta_{T}$', def: 'Képlete táblázatban', mer: 'kg^2*m/s', alkat_id: 6 },
            { nev: 'A tömegközéppont és a forgástengely távolsága', jel: 's', def: 'alapmennyiség', mer: 'méter (m)', alkat_id: 6 },
            { nev: 'Frekvencia', jel: 'f', def: '1/T', mer: '1/sec', alkat_id: 6 },
            { nev: 'Hullámhossz', jel: '$\\lambda$', def: 'A szomszédos, azonos fázisú helyek távolsága', mer: 'méter (m)', alkat_id: 6 },
            { nev: 'A hullám pillanatnyi kitérése az x helyen, a t időpillanatban', jel: 'y(x,t)', def: '$A * sin[\\omega * (t - x/c)]$', mer: 'méter (m)', alkat_id: 6 },
            { nev: 'Abszolút hőmérséklet', jel: 'T', def: 'alapmennyiség', mer: 'K (Kelvin)', alkat_id: 7 },
            { nev: 'Hőmérséklet', jel: 't', def: 'T-273', mer: '°C (Celsius fok)', alkat_id: 7 },
            { nev: 'Hőmérséklet változás', jel: '$\\Delta t$, $\\Delta T$', def: 't<sub>2</sub>-t<sub>1</sub>$-=T<sub>2</sub>-T<sub>1</sub>', mer: '°C, K', alkat_id: 7 },
            { nev: 'Hosszúság, megnyúlás', jel: '$l, \\Delta l$', def: 'alapmennyiség, i<sub>2</sub>-i<sub>1</sub>', mer: 'méter (m)', alkat_id: 7 },
            { nev: 'Felszín, felszínváltozás', jel: '$A, \\Delta A$', def: 'alakfüggő, A<sub>2</sub>-A<sub>1</sub>', mer: 'm^2 (négyzetméter)', alkat_id: 7 },
            { nev: 'Térfogat, térfogatváltozás', jel: '$V,\\Delta V$', def: 'alakfüggő, V<sub>2</sub>-V<sub>1</sub>', mer: 'm^3 (köbméter)', alkat_id: 7 },
            { nev: 'Lineáris hőtágulási együttható', jel: '$\\alpha$', def: '$(\\Delta l)/(l \\Delta t)$ (l<sub>0</sub>)', mer: '1/°C vagy 1/K', alkat_id: 7 },
            { nev: 'Térfogati hőtágulási együttható', jel: '$\\beta$', def: '$(\\Delta V)/(V \\Delta t)$ (V<sub>0</sub>)', mer: '1/°C vagy 1/K', alkat_id: 7 },
            { nev: 'Nyomás', jel: 'p', def: '$(F)/(A)$ nyomó erő/nyomott terület', mer: 'Pa (Pascal)(N/m^2)', alkat_id: 7 },
            { nev: 'Tömeg', jel: 'm', def: 'alapmennyiség', mer: 'kg (kilogramm)', alkat_id: 7 },
            { nev: 'Moláris tömeg', jel: 'M', def: 'táblázati adat', mer: 'g/mol (gramm/mol)', alkat_id: 7 },
            { nev: 'Molekulák száma', jel: 'N', def: 'nincs', mer: 'nincs', alkat_id: 7 },
            { nev: 'Anyagmennyiség (mólszám)', jel: 'n', def: 'm/M', mer: 'mol', alkat_id: 7 },
            { nev: 'Egyetemes gázállandó', jel: 'R', def: '8,31', mer: 'J/(mol·K)', alkat_id: 7 },
            { nev: 'Boltzmann-állandó', jel: 'k', def: '1,38$*$10<sup>-23</sup>', mer: 'J/K', alkat_id: 7 },
            { nev: 'Avogadro-állandó', jel: 'N<sub>A</sub>', def: '6$*$10<sup>23</sup>', mer: '1/(mol)', alkat_id: 7 },
            { nev: 'A szabadsági fokok száma', jel: 'f', def: 'az energiatárolás független lehetőségeinek a száma', mer: 'nincs', alkat_id: 7 },
            { nev: 'Az egy szabadságfokra jutó átlagos energia', jel: '$\\epsilon_{1}$', def: '$½ k * T$', mer: 'J (Joule)', alkat_id: 7 },
            { nev: 'Egy molekula átlagos mechanikai energiája', jel: '$\\epsilon$', def: '$f * ½  k * T$', mer: 'J (Joule)', alkat_id: 7 },
            { nev: 'Belső energia', jel: 'belső energia', def: 'E N f \\cdot \\frac{1}{2} k T', mer: 'J (Joule)', alkat_id: 7 },
            { nev: 'Hő (hőenergia)', jel: 'Q', def: 'a hőközlés mértéke', mer: 'J (Joule)', alkat_id: 7 },
            { nev: 'Fajhő', jel: 'c', def: '$\\frac{Q}{m \\Delta T}$', mer: 'J/(kg·K)', alkat_id: 7 },
            { nev: 'A fajhő állandó nyomáson', jel: 'c<sub>p</sub>', def: '$\\frac{Q}{m \\Delta T}$', mer: 'J/(kg·K)', alkat_id: 7 },
            { nev: 'A fajhő állandó térfogaton', jel: 'c<sub>v</sub>', def: '$\\frac{Q}{m \\Delta T}$', mer: 'J/(kg·K)', alkat_id: 7 },
            { nev: 'Hőkapacitás', jel: 'C', def: 'm$*$c', mer: 'J/K', alkat_id: 7 },
            { nev: 'Olvadáshő, fagyáshő', jel: 'L<sub>o</sub>', def: '$\\frac{Q}{m}$', mer: 'J/kg', alkat_id: 7 },
            { nev: 'Párolgáshő', jel: 'L<sub>p</sub>', def: '$\\frac{Q}{m}$', mer: 'J/kg', alkat_id: 7 },
            { nev: 'Forráshő, lecsapódáshő', jel: 'L<sub>f</sub>', def: '$\\frac{Q}{m}$', mer: 'J/kg', alkat_id: 7 },
            { nev: 'A gáz által végzett tágulási munka', jel: 'W', def: 'folyamatfüggő', mer: 'J (joule)', alkat_id: 7 },
            { nev: 'Izobár folyamatnál', jel: 'W', def: 'p $\\cdot$ DeltaV', mer: 'J (joule)', alkat_id: 7 },
            { nev: 'Izochor folyamatnál', jel: 'W', def: '0 Nulla', mer: 'J (joule)', alkat_id: 7 },
            { nev: 'Izoterm folyamatnál', jel: 'W', def: 'Fgvt.(140.o.)', mer: 'J (joule)', alkat_id: 7 },
            { nev: 'Adiabatikus folyamatnál', jel: 'W', def: 'Fgvt.(140.o.)', mer: 'J (joule)', alkat_id: 7 },
            { nev: 'El. töltés', jel: 'Q (nagy kú)', def: 'A$*$s', mer: 'Amper szekundum = Coulomb (C)', alkat_id: 8 },
            { nev: 'El. térerősség', jel: '$\\vec{E}$ (E vektor)', def: '$(\\vec{F})/Q$', mer: 'N/C', alkat_id: 8 },
            { nev: 'El. fluxus', jel: '$\\psi$ (nagy pszí)', def: 'E $\\cdot$ A', mer: 'Volt $*$ méter (V $*$ m)', alkat_id: 8 },
            { nev: 'El. feszültség', jel: 'U', def: 'W/Q', mer: 'J/C = Volt (V)', alkat_id: 8 },
            { nev: 'El. kapacitás', jel: 'C', def: 'Q/U', mer: 'C/V = farád (F)', alkat_id: 8 },
            { nev: 'El. áramerősség', jel: 'I (nagy i)', def: '$\\frac{Q}{\\Delta t}$', mer: 'C/sec = Amper (A)', alkat_id: 8 },
            { nev: 'El. ellenállás', jel: 'R', def: '$\\frac{U}{I}$', mer: 'V/A = Ohm ($\\Omega$)', alkat_id: 8 },
            { nev: 'Fajlagos ellenállás', jel: '$\\rho$ (kis ró)', def: '(R $\\cdot$ A)/l', mer: 'Ohm $*$ méter', alkat_id: 8 },
            { nev: 'El. vezetőképesség', jel: 'G', def: '1/R', mer: '1/(Ohm)= siemens(S)', alkat_id: 8 },
            { nev: 'Fajlagos vezetőképesség', jel: '$\\sigma$ (kis szigma)', def: '$1 / \\rho$', mer: '(siemens)/(méter)', alkat_id: 8 },
            { nev: 'Mágn. indukció', jel: '$\\vec{B}$', def: '$\\frac{M}{I \\cdot A}$', mer: 'N/(Am)$=$(V$\\cdot$s)/m^2$=T (tesla)', alkat_id: 9 },
            { nev: 'Mágn. indukciófluxus', jel: '$\\Phi$ (nagy fí)', def: 'B$*$A', mer: 'V$*$s=Wb (weber)', alkat_id: 9 },
            { nev: 'Mágn. nyomaték', jel: 'm', def: 'I$*$A', mer: 'A$*m^2$', alkat_id: 9 },
            { nev: 'Önindukciós együttható (induktivitás)', jel: 'L', def: 'képlete táblázatban', mer: '$(V\\cdot s)/A$=H (henry)', alkat_id: 9 },
            { nev: 'Ohmikus ellenállás', jel: 'R', def: '$\\frac{\\rho \\cdot l}{A}$', mer: 'Ohm ($\\Omega$)', alkat_id: 10 },
            { nev: 'Induktív ellenállás', jel: 'X<sub>L</sub>', def: '$\\omega \\cdot L$', mer: 'Ohm ($\\Omega$)', alkat_id: 10 },
            { nev: 'Kapacitív ellenállás', jel: 'X<sub>C</sub>', def: '$\\frac{1}{\\omega \\cdot C}$', mer: 'Ohm ($\\Omega$)', alkat_id: 10 },
            { nev: 'Impedancia', jel: 'Z', def: '$\\left((X-X)^2+R^2\\right)^{\\frac{1}{2}}$ (X<sub>L</sub>-X<sub>C</sub>)', mer: 'Ohm ($\\Omega$)', alkat_id: 10 }
        ];

        for (const tableData of Tables) {
            await Table.findOrCreate({
                where: { nev: tableData.nev, jel: tableData.jel, def: tableData.def, mer: tableData.mer,  alkat_id : tableData.alkat_id },
                defaults: tableData,
            });
        }
    }

    return Table;
}