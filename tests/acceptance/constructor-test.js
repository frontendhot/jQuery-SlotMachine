/* eslint-disable no-undef */

describe('Constructor', () => {
  let machine;
  let shuffleSpy;
  let autoSpy;

  beforeEach(() => {
    shuffleSpy = sinon.spy(SlotMachine.prototype, 'shuffle');
    autoSpy = sinon.spy(SlotMachine.prototype, 'auto');
  });

  afterEach(() => {
    shuffleSpy.restore();
    autoSpy.restore();
    if (machine) {
      machine.element.remove();
    }
  });

  it('has element', () => {
    machine = render();
    const element = document.getElementById(id);

    expect(machine.element).to.be.equal(element);
  });

  it('element does not have overflow', () => {
    machine = render();

    expect(machine.element.style.overflow).to.be.equal('hidden');
  });

  it('has settings', () => {
    machine = render();

    expect(machine.settings).to.exist;
  });

  [
    { active: 0, result: 0 },
    { active: 1, result: 1 },
    { active: 99, result: 0 },
    { active: -99, result: 0 },
    { active: '0', result: 0 },
    { active: {}, result: 0 },
    { active: null, result: 0 },
    { active: undefined, result: 0 }
  ].forEach((testCase) => {
    it(`sets active: ${testCase.active}`, () => {
      machine = render({
        active: testCase.active
      });

      expect(machine.active).to.be.equal(testCase.result);
    });
  });

  it('wraps tiles and adds offsets', () => {
    machine = render();

    expect(machine.container.classList.contains('slotMachineContainer')).to.be.true;
    expect(machine.container.children).to.have.lengthOf(5);
  });

  ['up', 'down'].forEach((direction) => {
    it(`sets direction: ${direction}`, () => {
      machine = render({
        direction: direction
      });

      expect(machine.direction.key).to.be.equal(direction);
    });
  });

  it('sets randomize', () => {
    const randomize = () => {};
    machine = render({
      randomize
    });

    expect(machine._randomize).to.be.equal(randomize);
  });

  it('does not auto start', () => {
    machine = render();

    expect(shuffleSpy).to.not.have.been.called;
    expect(autoSpy).to.not.have.been.called;
  });

  it('shuffles when auto is set to true', () => {
    machine = render({
      auto: true
    });

    expect(shuffleSpy).to.have.been.called;
    expect(autoSpy).to.not.have.been.called;
  });

  it('run auto when auto is set to number', () => {
    machine = render({
      auto: 1
    });

    expect(shuffleSpy).to.not.have.been.called;
    expect(autoSpy).to.have.been.called;
  });
});
