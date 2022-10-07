import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownToggle, DropdownMenu, Dropdown, Spinner } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import { useAuth0 } from "@auth0/auth0-react";
import { logout_app } from "../../../../redux/Reducer";

const User = () => {
  const USER = useSelector((state) => state?.reducer?.user);
  const [open, setOpen] = useState(false);
  const { logout, user, isLoading } = useAuth0();
  const toggle = () => setOpen((prevState) => !prevState);
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(logout_app());
    logout({
      returnTo: "https://hq.sine.capital/",
    });
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <UserAvatar icon="user-alt" className="sm" />
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <img src={USER?.picture} />
            </div>
            <div className="user-info">
              <span className="lead-text">{USER?.name}</span>
              <span className="sub-text">{USER?.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner"></div>
        <div className="dropdown-inner">
          <LinkList>
            <a onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
              {isLoading && <Spinner />}
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
