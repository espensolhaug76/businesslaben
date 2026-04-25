# Interior Assets — AdVenture 3.0

Disse PNG-filene skal genereres i Nano Banana og legges her.
Stil: Supercell Hay Day-inspirert, isometrisk/2.5D, cute stylized 3D render.
Samme stil som bygningene på bykartet.

## Standard størrelser

| Type              | Størrelse   |
|-------------------|-------------|
| Vegger / gulv     | 1920 × 1080 |
| Møbler / hyller   | 512 × 512   |
| Små objekter      | 256 × 256   |
| Hylle-states      | 512 × 512 (tom / halvfull / full — tre separate filer) |

---

## common/

```
floor_wood.png          Tregulv (varm eikefarge)
wall_brick.png          Mursteinvegg (bakvegg)
wall_white.png          Hvit pusstvegg (kontorrom)
door_front.png          Inngang med glassdør
window.png              Butikkvindu
divider_wall.png        Tynn skillevegg mellom rom
```

---

## office/

```
office_desk.png         Skrivebord med PC og skjerm
whiteboard.png          Whiteboard med strekkode/graf
office_chair.png        Kontorstol
plant.png               Potteplante (dekor)
coffee_machine.png      Kaffemaskin på benk
```

---

## warehouse/

```
warehouse_shelf_empty.png   Lagerhylle — TOM (lys beige)
warehouse_shelf_half.png    Lagerhylle — HALVFULL (medium brun)
warehouse_shelf_full.png    Lagerhylle — FULL (mørk brun, pakker stablet)
box_stack.png               Stabel med pappesker
forklift.png                Palletruck (dekorasjon)
back_door.png               Bakdør til lager
```

---

## shop/cafe/

```
cafe_counter.png            Kafédisk med espressomaskin
cafe_pastry_display.png     Bakverksdisk med glass-front
cafe_table.png              Rundt bord med 2 stoler
cafe_chalkboard_menu.png    Kritt-tavle med meny
cafe_shelf_empty.png        Kafé-hylle — TOM
cafe_shelf_half.png         Kafé-hylle — HALVFULL
cafe_shelf_full.png         Kafé-hylle — FULL
```

---

## shop/fashion/

```
clothing_rack.png           Klesstativ (rund/oval)
clothing_shelf_folded.png   Hylle med brettede klær
clothing_mannequin.png      Mannekeng med antrekk
clothing_mirror.png         Stort speil med ramme
clothing_fitting_room.png   Prøveromsgardiner
clothing_rack_empty.png     Klesstativ — TOM
clothing_rack_half.png      Klesstativ — HALVFULL
clothing_rack_full.png      Klesstativ — FULL
```

---

## shop/tech/

```
tech_display_table.png      Demo-bord med produkter
tech_wall_shelf.png         Vegghylle med elektronikk
tech_demo_station.png       Demo-stasjon (PC + skjerm)
tech_cashier.png            Kasse med betalingsterminal
tech_shelf_empty.png        Tech-hylle — TOM
tech_shelf_half.png         Tech-hylle — HALVFULL
tech_shelf_full.png         Tech-hylle — FULL
```

---

## shop/sports/

```
sport_wall_rack.png         Vegg-rack med utstyr
sport_floor_display.png     Gulvdisplay (rund midtstiller)
sport_bike_rack.png         Sykkelstativ med 2–3 sykler
sport_clothing_rack.png     Sportsklær-stativ
sport_rack_empty.png        Sports-rack — TOM
sport_rack_half.png         Sports-rack — HALVFULL
sport_rack_full.png         Sports-rack — FULL
```

---

## Integrering

Når PNG-filer er klare: erstatt Phaser `g.fillRoundedRect(...)` slots
i `InteriorScene.ts` > `drawSalesFloor()` og `drawWarehouse()` med
`this.add.image(x, y, 'nøkkel')` etter preloading i `BootScene.ts`.

Slot-farger som brukes nå (placeholder):
- Møbler: `#607d8b` (blågrå)
- Hyller:  `#795548` (brun)
- Dekor:   `#388e3c` (grønn)
