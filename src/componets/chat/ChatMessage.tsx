import { Box, Container } from '@mui/system'
import React, { useState } from 'react'
import MediaCarsoul from './mediaCarsoul'
import { Avatar, Typography, Modal } from '@mui/material'

const ChatMessage = ({ message, own, image, video, document }: any) => {
  const media = [
    {
      uri: image !== null ? image[0] : null,
    },
  ]
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Container fixed sx={{  }}>
      <Box >
        <Box
          sx={{
            display: 'flex',
            justifyContent: own ? 'flex-end' : 'none',
           
          }}
        >
          <Box
            sx={{
              display: own ? 'none' : 'flex',
              padding: 1,
            }}
          >
            <Avatar alt="we" sx={{ width: 20, height: 20 }}></Avatar>
          </Box>

          {message !== '' ? (
            <Typography
              sx={{
                display: 'inline',
                backgroundColor: own ? '#007ef2' : '#D3D3D3',
                padding: '10px',
                borderRadius: '0.5rem',
                color: own ? 'white' : 'black',
              }}
            >
              {message}
            </Typography>
          ) : (
            <React.Fragment>
              <Box
                onClick={handleOpenModal}
                sx={{
                  minWidth: '25vw',
                  minHeight: '25vh',
                  maxWidth: '25vw',
                  maxHeight: '25vh',
                  borderRadius: '0.9rem',
                }}
              >
                <MediaCarsoul
                  isVideo={true}
                  media={media}
                  openModal={openModal}
                />
              </Box>
              <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10,

                    borderRadius: '0.9rem',
                    minHeight: '60vh',
                    maxHeight: '60vh',
                  }}
                >
                  <MediaCarsoul
                    isVideo={true}
                    media={media}
                    openModal={openModal}
                  />
                </Box>
              </Modal>
            </React.Fragment>
          )}
        </Box>

        {/* <div className="messageBottom">{message.createdAt}</div> */}
      </Box>
    </Container>
  )
}

export default ChatMessage
