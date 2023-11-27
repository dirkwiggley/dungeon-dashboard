import { Box, Button, Dialog, DialogActions, DialogContentText, DialogTitle, Stack } from "@mui/material";

export interface HelloDialogProps {
  onClose: () => void;
}

export default function HelloDialog(props: HelloDialogProps) {
  const { onClose } = props;

  return (
    <Dialog open={true}>
      <DialogTitle>Welcome to a little demo</DialogTitle>
      <DialogContentText sx={{marginLeft: 2, marginRight: 2}}>
        <Stack>
          <Box sx={{marginBottom: 2}}>
            I was just doing a little random goofing around with MUI just experimenting with a few ideas one morning and when I looked up, the sun was down and I had the shell of the app you're looking at today. I decided to follow this wherever it lead and eventually wound up here. It definitely has some rough edges but it does show a bit of what I can do with some of the tools I'm familiar with.
          </Box>
          <Box sx={{marginBottom: 2}}>
            Regards,
          </Box>
          <Box>
            Tim
          </Box>
        </Stack>
      </DialogContentText>
      <DialogActions>
        <Button onClick={onClose} sx={{marginRight: 1}}>CLOSE</Button>
      </DialogActions>
    </Dialog>
  );
}