import { useState } from "react";
import AppLayout from "../components/layouts/App";

// ! Assets
import hands from "../assets/data/hands";

// ! Components
import {
  PageHeading,
  PageTagline,
  SubTitle,
  Paragraph
} from "../components/core/Prose";

export default function Hands() {
  return (
    <AppLayout title="The Chamomile Club | The Hands" navbarFixed>
      <div className="w-full container max-w-4xl mx-auto px-8 pt-28 pb-10 md:px-0">
        <div className="mb-10">
          <PageHeading>The Hands</PageHeading>
          <PageTagline>Like Normal Texas Hold'em, All In One Place</PageTagline>
        </div>
        {
          hands.map(hand => (
            <div className="mb-5" key={hand.name}>
              <SubTitle>{ hand.name }</SubTitle>
              <Paragraph>{ hand.description }</Paragraph>
              <div className="flex items-center space-x-3 mt-3">
                {
                  hand.cards.map((Card, index) => (
                    <Card
                      className="w-1/5 h-auto md:w-1/12 shadow-lg"
                      key={`${hand.name}-${index}`}
                    />
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </AppLayout>
  )
}
