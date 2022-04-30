import { useState, useEffect } from "react";
import { Box, Layer, Button, Text } from "grommet";
import { FormClose, StatusGood } from "grommet-icons";
import { useRecoilState } from "recoil";
import { NotificationState } from "~/NotificationState";

export function Notification() {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useRecoilState(NotificationState);

  useEffect(() => {
    console.log("notification changed", notification);
    if (notification) {
      setOpen(true);
      setTimeout(() => {
        setOpen(undefined);
      }, 3000);
    }
  }, [notification]);

  const onClose = () => setOpen(undefined);

  return open ? (
    <Layer
      position="bottom"
      modal={false}
      margin={{ vertical: "medium", horizontal: "small" }}
      onEsc={onClose}
      responsive={false}
      plain
    >
      {notification ? (
        <Box
          align="center"
          direction="row"
          gap="small"
          justify="between"
          round="medium"
          elevation="medium"
          pad={{ vertical: "xsmall", horizontal: "small" }}
          background="status-ok"
        >
          <Box align="center" direction="row" gap="xsmall">
            <StatusGood />
            {notification.message ? <Text>{notification.message}</Text> : null}
          </Box>
          <Button icon={<FormClose />} onClick={onClose} plain />
        </Box>
      ) : (
        <p>hi</p>
      )}
    </Layer>
  ) : null;
}
