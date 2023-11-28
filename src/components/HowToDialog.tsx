import { Box, Button, ClickAwayListener, Dialog, DialogActions, DialogContentText, DialogTitle, Divider, List, ListItem, Stack, Typography } from "@mui/material";
import React from "react";

export interface HowToDialogProps {
  onClose: () => void;
}

export default function HowToDialog(props: HowToDialogProps) {
  const { onClose } = props;

  return (
    <Dialog open={true} >
      <DialogTitle>How to use the editor</DialogTitle>
      <DialogContentText sx={{ marginLeft: 2, marginRight: 2 }}>
        <Stack>
          <Box sx={{ marginBottom: 2 }}>
            Here are a few tips on how to use this editor:
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <List>
              <ListItem>Select Button - This button cycles through the various modes (Select, Edit, and Build Room) with the button text describing the current mode.</ListItem>
              <ListItem>Cancel Button - Will undo your current work and switch to Select Mode.</ListItem>
              <ListItem>Commit Button - Clicking here will take the work you've been doing and save it for the current session. If you're in Edit Mode, it'll update the map tiles. Note if you update a tile in an existing room you will be prompted to see if you want to delete that room. It won't alter the tiles, just the list of tiles that make up an existing room. If you're in Build Room it'll update the list of rooms with your new room.</ListItem>
            </List>
          </Box>
          <Divider />
          <Box sx={{ marginTop: 1 }}>
            <Stack>
              <Typography>Modes</Typography>
              <List>
                <ListItem>Select Mode - Clicks around the map, highlighting all of the tiles in a room if you've selected a room tile.</ListItem>
                <ListItem>Edit Mode - Changes the tiles on the map.</ListItem>
                <ListItem>Build Room - Creates a list of tiles that make up rooms that you label.</ListItem>
              </List>
            </Stack>
          </Box>
        </Stack>
      </DialogContentText>
      <DialogActions>
        <Button onClick={onClose} sx={{ marginRight: 1 }}>CLOSE</Button>
      </DialogActions>
    </Dialog>
  );
}