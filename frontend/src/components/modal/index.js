import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { CardMedia, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const styles = makeStyles({

})
export default function Modal(props) {
    const theme = useTheme();
    const classes = styles()
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <div>
                <Dialog
                    open={props.open}
                    fullWidth
                    onClose={props.onClose}
                    aria-labelledby="form-dialog-title"
                    fullScreen={props.screen ? props.fullScreen : fullScreen}
                    {...props}
                >
                    <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                    <DialogContent>
                        <main>{props !== undefined ? props.children : null}</main>
                    </DialogContent>
                    {!props.noActions && (
                        <DialogActions>
                            {(props.buttonCancel) && (
                                <Button onClick={props.handleButtonCancel} color="default">
                                    Cancelar
                                </Button>
                            )}
                            <Button onClick={props.handleButtonConfirm || props.onClose} color="primary">
                                {props.buttonConfirmText || 'Ok'}
                            </Button>
                        </DialogActions>
                    )}
                </Dialog>
            </div>
        </>
    );
}
