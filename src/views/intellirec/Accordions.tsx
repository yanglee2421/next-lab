'use client'

import React from 'react'

import { Accordion, AccordionSummary, styled, AccordionDetails, Typography } from '@mui/material'
import { KeyboardArrowDownOutlined } from '@mui/icons-material'

export function Accordions() {
  const [expanded, setExpanded] = React.useState(1)

  const handleExpandedChange = (expanded: number) => {
    return () => {
      setExpanded(expanded)
    }
  }

  return (
    <>
      <Accordion expanded={expanded === 1} onChange={handleExpandedChange(1)}>
        <AccordionSummary expandIcon={<KeyboardArrowDownOutlined></KeyboardArrowDownOutlined>}>
          <StyledTypography>Collaborative Filtering Recommendation</StyledTypography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Typography>
            Collaborative Filtering Recommendation is a technique used in recommendation systems to provide personalized
            suggestions or recommendations to users based on their past behavior and preferences, as well as the
            behavior and preferences of similar users. It can be divided into two main approaches: user-based and
            item-based collaborative filtering.
          </Typography>
        </StyledAccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 2} onChange={handleExpandedChange(2)}>
        <AccordionSummary expandIcon={<KeyboardArrowDownOutlined></KeyboardArrowDownOutlined>}>
          <StyledTypography>Contextual Recommendation</StyledTypography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Typography>
            Contextual recommendation refers to a technique used in recommendation systems that takes into account the
            specific situation or context in which the recommendation is being made. In addition to user preferences and
            item attributes, contextual information may include factors such as time, location, social setting, or even
            the user's mood. By considering this context, recommendation systems can provide more relevant and
            personalized suggestions that cater to the user's specific needs and circumstances at a given moment. This
            can result in a better user experience and increased user satisfaction, as the recommendations are more
            aligned with what the user is looking for at that particular time and situation.
          </Typography>
        </StyledAccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 3} onChange={handleExpandedChange(3)}>
        <AccordionSummary expandIcon={<KeyboardArrowDownOutlined></KeyboardArrowDownOutlined>}>
          <StyledTypography>Reinforcement Learning-based Recommendation</StyledTypography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Typography>
            Reinforcement Learning-based Recommendation (RL-based Recommendation) refers to utilizing reinforcement
            learning algorithms to provide personalized recommendations to users. In this approach, the recommendation
            system acts as an agent and learns to interact with users, making use of trial-and-error learning to
            discover optimal policies to provide relevant, accurate, and engaging content.
          </Typography>
          <Typography>
            Reinforcement learning is a type of machine learning where an agent learns to make decisions by interacting
            with its environment, receiving feedback in the form of rewards or penalties, and optimizing its actions to
            maximize the cumulative reward. In the context of a recommendation system, the agent aims to learn the best
            sequence of recommended items, such as articles, products, or movies, to show a user, in order to maximize
            user engagement, satisfaction, or clicks, for example.
          </Typography>
          <Typography>
            Advantages of RL-based recommendation systems include better personalization, adaptivity to changing user
            preferences, and potential exploration of novel items that traditional collaborative filtering or
            content-based methods may not discover.
          </Typography>
        </StyledAccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 4} onChange={handleExpandedChange(4)}>
        <AccordionSummary expandIcon={<KeyboardArrowDownOutlined></KeyboardArrowDownOutlined>}>
          <StyledTypography>Deep Learning-based Recommendation</StyledTypography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Typography>
            Deep Learning Based Recommendation refers to the use of deep learning techniques in the creation and
            functioning of recommendation systems. Recommendation systems are algorithms that help companies and
            products provide personalized suggestions and recommendations to users based on their interests,
            preferences, and past behavior.
          </Typography>
          <Typography>
            In traditional recommendation systems, such as collaborative filtering and content-based filtering, simple
            statistical methods are used to correlate items with user preferences. On the other hand, deep learning
            allows for the automatic learning of complex patterns and representations from large sets of data.
          </Typography>
          <Typography>
            Deep learning based recommendation systems typically use artificial neural networks to model user behavior
            and preferences. These models can handle multi-dimensional data, understand the complexities of user
            preferences, and use that information to provide more accurate and relevant recommendations.
          </Typography>
          <Typography>Some common deep learning techniques in recommendation systems include:</Typography>
          <Typography>
            1. Embedding layers: To transform categorical data (e.g., user IDs or item IDs) into continuous dense
            vectors, which can capture user and item characteristics.
          </Typography>
          <Typography>
            2. Convolutional Neural Networks (CNNs): For extracting features and patterns from image, text, and other
            structured data associated with the items.
          </Typography>
          <Typography>
            3. Recurrent Neural Networks (RNNs) and LSTMs: To capture time-dependent and sequential patterns in user
            behavior, such as recurrent visits to specific items or long-term user preferences.
          </Typography>
          <Typography>
            4. Autoencoders and Variational Autoencoders: For learning latent representations of the data and providing
            recommendations based on the similarity of these representations.
          </Typography>
          <Typography>
            5. Attention mechanisms: For capturing the relative importance of different features in the recommendation
            process.
          </Typography>
          <Typography>
            Deep learning based recommendation systems have shown significant improvements over traditional methods and
            are increasingly being deployed in various industries such as e-commerce, entertainment, news, and
            advertising.
          </Typography>
        </StyledAccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 5} onChange={handleExpandedChange(5)}>
        <AccordionSummary expandIcon={<KeyboardArrowDownOutlined></KeyboardArrowDownOutlined>}>
          <StyledTypography>Sequential Recommendation</StyledTypography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Typography>
            Sequential recommendation is a recommendation approach that takes into account the order of the items users
            have interacted with, aiming to predict their next preference based on their sequence history. This type of
            recommendation system particularly focuses on modeling the user's dynamic and evolving preferences over
            time, which can be useful in applications like music playlists, video streaming services, and online
            shopping platforms. Sequential recommendation systems often involve techniques from sequence mining, natural
            language processing, and deep learning to model user behavior patterns and generate recommendations
            accordingly.
          </Typography>
        </StyledAccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 6} onChange={handleExpandedChange(6)}>
        <AccordionSummary expandIcon={<KeyboardArrowDownOutlined></KeyboardArrowDownOutlined>}>
          <StyledTypography>Graph-based Recommendation</StyledTypography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <Typography>
            Graph-based recommendation is an approach used in recommender systems to make personalized suggestions based
            on the analysis of relationships and network structures within a graph. This type of recommender system uses
            graph theory and algorithms to explore patterns and connections between entities in a dataset, such as
            users, items, and their attributes.
          </Typography>
          <Typography>
            In a graph-based recommendation system, data is represented as a graph, where nodes represent entities
            (e.g., users, products) and edges represent relationships (e.g., user preferences, item similarities). The
            system then leverages this graph representation to identify relevant recommendations by finding similar
            users or items, analyzing the connections within the graph, or computing scores and rankings based on
            various graph properties.
          </Typography>
          <Typography>
            There are multiple techniques in graph-based recommender systems, including collaborative filtering,
            content-based methods, and hybrid approaches. Some popular graph-based algorithms include PageRank,
            Personalized PageRank, Random Walk with Restart, and SimRank. These methods can help improve the performance
            and accuracy of recommendations by taking advantage of the rich information available in the relationships
            between entities in the graph.
          </Typography>
        </StyledAccordionDetails>
      </Accordion>
    </>
  )
}

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => {
  return {
    '& .MuiTypography-root + .MuiTypography-root': {
      marginTop: theme.spacing(3)
    }
  }
})

const StyledTypography = styled(Typography)({
  fontWeight: 600
})
