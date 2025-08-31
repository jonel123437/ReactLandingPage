import React from "react";
import { Card, CardContent, Typography, Divider, Stack } from "@mui/material";

const ProfileDetails = ({ user }) => {
  const details = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
  ];

  return (
    <div style={{ width: "100%", padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>
        Profile Details
      </Typography>
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Stack spacing={1}>
            {details.map((detail, index) => (
              <React.Fragment key={detail.label}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  py={1}
                  px={2}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    {detail.label}
                  </Typography>
                  <Typography variant="body1">{detail.value}</Typography>
                </Stack>
                {index < details.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetails;
