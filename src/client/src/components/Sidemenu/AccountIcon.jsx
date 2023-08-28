import React from "react";
import { MUI } from '../../helpers/MaterialUI';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <React.Fragment>
        <MUI.Layout.Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <MUI.Display.Tooltip title="Opciones">
            <MUI.Buttons.IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 1 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MUI.Display.Avatar sx={{ width: 32, height: 32 }}>A</MUI.Display.Avatar>
            </MUI.Buttons.IconButton>
          </MUI.Display.Tooltip>
        </MUI.Layout.Box>
        <MUI.Nav.Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MUI.Nav.MenuItem onClick={handleClose}>
            <MUI.Icons.ListItemIcon>
              <MUI.Icons.Logout sx={{marginRight: "4px"}} fontSize="small" />
              Salir
            </MUI.Icons.ListItemIcon>
          </MUI.Nav.MenuItem>
        </MUI.Nav.Menu>
      </React.Fragment>
    );
  }