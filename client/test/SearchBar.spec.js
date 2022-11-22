import { configure, shallow } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Link } from "react-router-dom";
import SearchBar from "../src/components/SearchBar/SearchBar";
import React from "react";
import isReact from "is-react";

configure({ adapter: new Adapter() });

describe("<SearchBar />", () => {
  let searchBar;

  beforeEach(() => {
    searchBar = shallow(<SearchBar />);
    expect(isReact.classComponent(SearchBar)).toBeTruthy();
  });

  it('Debería renderizar dos <Link to="" />. El primero que vaya a "/create" y el segundo a "/home"', () => {
    expect(searchBar.find(Link).length).toBeGreaterThanOrEqual(2);
    expect(searchBar.find(Link).find({to:"/home"}).length).toBe(1)
    expect(searchBar.find(Link).find({to:"/create"}).length).toBe(1)
  });

  it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/home"', () => {
    expect(searchBar.find(Link).find({to:"/home"}).text()).toBe("Home");
  });

  it('Debería tener un segundo Link, con texto "Create your dog" y que cambie la ruta hacia "/create"', () => {
    expect(searchBar.find(Link).find({to:"/create"}).text()).toBe("Create your dog");
  });
});
