import update from "immutability-helper";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import { useDrop } from "react-dnd";

import { Card } from "./Card";
import { ItemTypes } from "./ItemTypes";

const style = {
  width: 400,
};

export interface ContainerState {
  cards: any[];
}

type Item = {
  id: string
  text:string
}

const ITEMS = [
  {
    id: 1,
    text: "Write a cool JS library",
  },
  {
    id: 2,
    text: "Make it generic enough",
  },
  {
    id: 3,
    text: "Write README",
  },
  {
    id: 4,
    text: "Create some examples",
  },
  {
    id: 5,
    text: "Spam in Twitter and IRC to promote it",
  },
  {
    id: 6,
    text: "???",
  },
  {
    id: 7,
    text: "PROFIT",
  },
];

export const Container: FC = memo(function Container() {
  const [cards, setCards] = useState(ITEMS);
  console.log(cards);

  // const [areas, setAreas] = useState( [{
  //   id: 8,
  //   text: "Something borrowed something new",
  // }]);

  const [areas, setAreas] = useState<Array<Item>>([]);

  const [] = useDrop({
    accept: ItemTypes.CARD,
  });

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c) => `${c.id}` === id)[0] as {
        id: number;
        text: string;
      };
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, cards, setCards]
  );

  const getGroup = () => {
    return (
      areas.map((card,idx) => (
        <Card
          key={card.id}
          id={`${card.id}`}
          text={card.text}
          moveCard={moveCard}
          findCard={findCard}
        />
      ))
    )
  }

  return (
    <>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={`${card.id}`}
          text={card.text}
          moveCard={moveCard}
          findCard={findCard}
        />
      ))}
      <div style={{ border: "solid 1px", height: "35px", marginTop: "50px" }}>
        {areas.length>0 && getGroup()}
      </div>
    </>
  );
});
