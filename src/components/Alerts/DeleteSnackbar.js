import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const DeleteSnackbar = ({open,Toggle}) => {
    return (
        <div>
            <Snackbar
                variant="success"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={Toggle}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">this question is deleted</span>}
                action={[

                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        // className={classes.close}
                        onClick={Toggle}
                    >
                        <Close />
                    </IconButton>,
                ]}
            >
            </Snackbar>
        </div>
    )
}

export default DeleteSnackbar
