'use client'

// MUI Imports

// NextJs Imports
import Image from 'next/image'
import RouterLink from 'next/link'

import { Container, Link, Stack, Typography, Button, Box } from '@mui/material'

export function Introduction() {
  return (
    <>
      <Container maxWidth='md'>
        <Stack spacing={6} mt={12}>
          <Typography variant='h3' align='center' py={6}>
            Warp Driven Recommendations
          </Typography>

          <Typography>
            Recommendation system attribute customization service, if needed please submit a work order to us through
            the button below, or contact{' '}
            <Link href='mailto:info@warp-driven.com?subject=recommendation system'>info@warp-driven.com</Link> by email.
          </Typography>
          <Box>
            <Button LinkComponent={RouterLink} href='/ticket' variant='contained'>
              get recommendation system
            </Button>
          </Box>
          <Typography variant='h5'>Intelligent Recommendation</Typography>
          <Typography>
            Collaborative Filtering Recommendation is a technique used in recommendation systems to provide personalized
            suggestions or recommendations to users based on their past behavior and preferences, as well as the
            behavior and preferences of similar users. It can be divided into two main approaches: user-based and
            item-based collaborative filtering.
          </Typography>
          <Typography>
            User-based collaborative filtering involves finding users who are similar to the target user based on their
            historical preferences and recommending items that those similar users have liked or interacted with. On the
            other hand, item-based collaborative filtering focuses on finding items that are similar to the ones the
            target user has interacted with or liked, and then recommending those similar items to the user.
          </Typography>
          <Typography>
            Collaborative filtering is widely used in various applications, such as movie or music recommendations,
            product suggestions, and online advertising.
          </Typography>
          <Box position={'relative'} sx={{ aspectRatio: '16/9' }}>
            <Image
              src={'/images/service/How-Artificial-Intelligence-Will-Change-the-Ecommerce-Industry-810x424-1.jpg'}
              alt='How-Artificial-Intelligence-Will-Change-the-Ecommerce-Industry'
              fill
            ></Image>
          </Box>

          <Typography variant='h5'>Visually Similar Recommendations</Typography>
          <Typography>
            Visually similar recommendations is a powerful tool that allows users to search for products based on a
            specific image. The technology uses machine learning algorithms to recognise visual features, such as shape,
            color, and texture, to provide more accurate search results. This type of search is especially useful for
            websites that sell products that are not easily describable using natural language, such as home and
            furniture, apparel, and more.
          </Typography>
          <Typography>
            The technology is easy to use for any website, even those with low traffic, and offers results that are
            consistent across product searches. In addition, the visual search algorithms of Warp Driven are tailored to
            all kinds of different industries, meaning that each product will be recognized accurately with pre-trained
            industrial models. This level of accuracy and consistency makes it easy to find exactly what the user is
            looking for.
          </Typography>
          <Typography variant='h6'>1. Visually Similar Recommendation Widget on product detail page</Typography>
          <Typography>Show visually similar items on the bottom of the product detail page.</Typography>
          <Box position={'relative'} sx={{ aspectRatio: '16/9' }}>
            <Image src='/images/service/visual-similar-search-0.jpg' alt='visual-similar-search-0' fill></Image>
          </Box>
          <Typography variant='h6'>2. Discovery View on product list page</Typography>
          <Typography>
            Show visually similar items on the followed windows for the clicked product on product list page including
            category page or search result page.
          </Typography>
          <Box position={'relative'} sx={{ aspectRatio: '16/9' }}>
            <Image src='/images/service/visual-similar-search-1.png' alt='visual-similar-search-1' fill></Image>
          </Box>

          <Box position={'relative'} sx={{ aspectRatio: '16/9' }}>
            <Image src='/images/service/visual-similar-search-2.png' alt='visual-similar-search-2' fill></Image>
          </Box>
        </Stack>
      </Container>
    </>
  )
}
