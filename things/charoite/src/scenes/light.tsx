import {makeScene2D} from '@motion-canvas/2d';
import {Circle, Rect, Txt, Img} from '@motion-canvas/2d/lib/components';

import {waitFor} from '@motion-canvas/core';

import charoite from '../images/charoite.png';
import charoite2 from '../images/charoite2.jpg';

const light = "BDB8D0";
const dark = "413B57";
const medium = "968EB4";
const cloud = "FFF8";
const bg = "141414";
const BaseFont = {
  fontFamily: 'JetBrains Mono',
  fontWeight: 700,
};

export default makeScene2D(function* (view) {
  
  view.add(
    <Rect clip strokeFirst stroke={bg} lineWidth={50} fill={light} size={[200, 200]} scale={0.5} position={[400, 607]} radius={50}>
      <Circle fill={medium} size={[40, 40]} position={[-20, -30]}/>
      <Circle fill={medium} size={[20, 20]} position={[-70, 0]}/>
      <Rect fill={cloud} size={[250, 40]} position={[-35, -110]} rotation={-50}/>
      <Rect fill={cloud} size={[250, 30]} position={[0, -20]} rotation={-35}/>
      <Circle fill={medium} size={[200, 220]} position={[() => 120,20]}/>
      <Circle fill={dark} size={[300, 200]} position={[0, () => 130]}/>
    </Rect>
  );

  view.add(
    <>
      <Txt {...BaseFont} y={-607} fontSize={70} fill={"000"}>{`Divulgação cientifica`}</Txt>
      <Txt {...BaseFont} position={[-260, -160]} fontSize={30} fill={"000"}>{`Charoita`}</Txt>
      <Txt {...BaseFont} position={[-400, -350]} fontSize={15} rotation={90} fill={"000"}>{`https://en.wikipedia.org/wiki/Charoite`}</Txt>
      <Img src={charoite} stroke={light} fill={light} radius={50} lineWidth={25} position={[-260, -350]}/>
      <Img src={charoite2} stroke={light} radius={50} lineWidth={25} position={[260, 150]}/>
      <Txt {...BaseFont} textAlign="justified" position={[180, -350]} fontSize={20} fill={"000"}>{`
      Charoita é um mineral de silicato raro
      encontrado a cerca de 70km do rio Chara,
      na Russia, foi descrito em 1978, não pela
      proximidade do rio Chara, mas sim pela 
      palavra russa Чары, que significa charme.

      Sua coloração é lavanda ou roxa brilhante,
      quando foi descoberto, era acreditado ser
      falso, sendo pintada de roxo para mostrar
      tal aparência
      `}</Txt>
      <Txt {...BaseFont} position={[-201, -20]} fontSize={40} fill={"000"}>{`Propriedades Físicas`}</Txt>
      <Txt {...BaseFont} position={[260, 270]} fontSize={20} fill={"000"}>{`Estrutura Química`}</Txt>
      <Txt {...BaseFont} position={[260, 300]} fontSize={20} fill={"000"}>{`K(Ca,Na) 2Si4 O10 (OH,F) •H2O`}</Txt>
      <Rect size={[480, 260]} position={[-201, 150]} radius={20} fill={light}>
        <Txt {...BaseFont} fontSize={20} fill={"000"} offset={[0, 0.1]}>{`
          •Sistema de cristal: Monoclinico
          •Classe de cristal: Prismatico
          •Cor: violeta, lilás e(ou) marrom claro
          •Textura: conchoidal
          •Dureza: 5 - 6
          •Rastro: branco
          •Fluorescência: fracamente fluorescente
          •Brilho: Vítreo a perolado
          •Impurezas: Fe, Al, Mn, Sr, Ba
          •Outro: presença de Potassio Radioativo
        `}</Txt>
      </Rect>
      <Txt {...BaseFont} position={[-189, 635]} fontSize={15} fill={"000"}>{`
      uujuju
      código fonte da divulgação em:
      github.com/uujuju1/mc-projects/tree/main/things/charoite
      `}</Txt>
    </>
  );

  yield* waitFor(1);
});
