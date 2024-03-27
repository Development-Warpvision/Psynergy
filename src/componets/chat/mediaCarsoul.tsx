import DocViewer from '@cyntler/react-doc-viewer'
import CardMedia from '@mui/material/CardMedia'
import React, { useState } from 'react'
import Carousel from 'react-material-ui-carousel'

interface Icarsoul {
  isVideo: boolean
  media: Array<any>
  openModal: boolean
}
const MediaCarsoul = ({ isVideo, media, openModal }: Icarsoul) => {
  const [activeDocument, setActiveDocument] = useState(media[0])

  const handleDocumentChange = (document: any) => {
    setActiveDocument(document)
  }
  console.log(openModal)

  return (
    <>
      {isVideo ? (
        <Carousel
          animation="slide"
          sx={{
            minWidth: openModal ? '80vw' : '25vw',
            minHeight: openModal ? '80vh' : '25vh',
            maxHeight: openModal ? '80vh' : '25vh',
            maxWidth: openModal ? '80vw' : '25vw',
            borderRadius: '0.7rem',
            background: 'black',
          }}
        >
          {media.map((item, index) => {
            return (
              // <Card sx={{ maxWidth: 345 }} key={i}>
              <CardMedia
                key={index}
                style={{
                  minWidth: openModal ? '80vw' : '25vw',
                  minHeight: openModal ? '80vh' : '25vh',
                  maxHeight: openModal ? '80vh' : '25vh',
                  maxWidth: openModal ? '80vw' : '25vw',
                  borderRadius: '0.7rem',
                  paddingTop: '2%',
                }}
                component={'image'}
                image={item.uri}

                // title="green iguana"
              />
              // </Card>
            )
          })}
        </Carousel>
      ) : (
        <DocViewer
          documents={media}
          activeDocument={activeDocument}
          onDocumentChange={handleDocumentChange}
        />
      )}
    </>
  )
}

export default MediaCarsoul
