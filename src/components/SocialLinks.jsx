import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Link,
  Typography,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import NoteIcon from "@mui/icons-material/EventNote";

const socialLinks = [
  {
    name: "Twitter",
    username: "@tenohiraniwawo",
    url: "https://twitter.com/Tenohiraniwawo",
    description: "説明テキスト",
    icon: <TwitterIcon />,
  },
  {
    name: "Instagram",
    username: "@tenohiraniwawo",
    url: "https://www.instagram.com/tenohiraniwawo/?hl=ja",
    description: "Instagram photos and videos",
    icon: <InstagramIcon />,
  },
  {
    name: "note",
    username: "@tenohirani_80",
    url: "https://note.com/tenohirani_80",
    description: "説明テキスト",
    icon: <NoteIcon />,
  },
];

export default function SocialLinks() {
  return (
    <List>
      {socialLinks.map((link, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar>{link.icon}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={link.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {link.username}
                </Typography>
                — {link.description}
              </React.Fragment>
            }
          />
          <Link href={link.url} target="_blank" rel="noopener">
            {link.url}
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
