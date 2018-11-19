import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

function Hello(props) {
    return <h1>hello at {props.now}</h1>
}

const moment = new Date(1588946400000);

describe("When testing directly", () => {
    let result;
    beforeAll(() => {
        result= Hello({now: moment.toISOString()});
    });

    it("return a value", () => {
        expect(result).not.toBeNull();
    });

    it("type check", () => {
        expect(result.type).toBe("h1");

    });
    
    it("children check", ()=> {
        expect(result.props.children).toBeTruthy();
    });
});

describe('when testing with react DOM', () => {
    it("when renders without error", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Hello now={moment.toISOString()} />, div);
    });
});

Enzyme.configure({ adapter: new Adapter()});


describe("testing with enzyme", () => {
    it("render a h1", () => {
        const wrapper = shallow(<Hello now={moment.toISOString()} />);
        expect(wrapper.find("h1").length).toBe(1);
    });
});