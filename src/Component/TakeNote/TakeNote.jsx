import React from "react";
import Icons from "../Icons/Icon";
import Button from "@mui/material/Button";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { getCardContentUtilityClass } from "@mui/material";
import "./TakeNote.scss";
import Userservice from "../../Service/UserService";

const userservice = new Userservice();

export default function TakeNote({ listenToTakeNote }) {
  
  const [open, setOpen] = React.useState(true);
  const [title, settitle] = React.useState(" ");
  const [description, setdescription] = React.useState(" ");
  const [archive, setArchive] = React.useState(false);
  const [color, setColor] = React.useState("");

  const addNote = () => {
    let data = {
      title: title,
      description: description,
      isArchived: archive,
      color: color,
    };
    userservice
      .TakeNote(
        "http://localhost:44388/api/Note/AddNote",
        data
      )
      .then(() => {
        console.log("sucessfully registered");
        setOpen(true);
        settitle("");
        setdescription("");
      })
      .catch((err) => {
        console.log(err);
      });

    listenToTakeNote(true);
  };
  const listenToArchive = (data) => {
    console.log(data);
    setArchive(!archive);
  };

  const handleNoteColor = (color) => {
    console.log("color", color);
    setColor(color);
  };

  return (
    <div>
      <div>
        {open ? (
          <div className="note-container" onClick={() => setOpen(false)}>
            <input
              type="text"
              placeholder="Take a note"
              onChange={(e) => setOpen(e.target.value)}
            />
            <div>
              <IconButton>
                <CheckBoxOutlinedIcon />
              </IconButton>
              <IconButton>
                <BrushOutlinedIcon />
              </IconButton>
              <IconButton>
                <ImageOutlinedIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <div
            className="note-container-notes"
            style={{ backgroundColor: color }}
          >
            {/* <IconButton ><PushPinOutlinedIcon /> </IconButton> */}
           
            <input
              className="input1"
              type="text"
              placeholder="Title"
              onChange={(e) => settitle(e.target.value)}
              style={{ backgroundColor: color , outline:"none",
                border:"none",
               }}
            />
            
            <input
              input
              className="input2"
              type="text"
              placeholder="Take a note"
              onChange={(e) => setdescription(e.target.value)}
              style={{ backgroundColor: color }}
            />
          
            <div className="Bottom" style={{ display: "flex" }}>
              <Icons
                listenToArchive={listenToArchive}
                handleNoteColor={handleNoteColor}
                style={{ backgroundColor: color }}
              />
              <Button onClick={() => addNote()}>close</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}