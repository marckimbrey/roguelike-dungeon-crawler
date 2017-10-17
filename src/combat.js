const combat = (function() {


  function attack(att, def) {
    const damage =(att.weapon)?  _calculateDamage(att.attack + att.weapon.attack): _calculateDamage(att.attack);
    def.health -= damage;
    return  def;

  }


  function _calculateDamage(attack) {
    return Math.round(Math.random() * ((attack + 3) - attack) + attack);
  }
  return ({
    attack
  })
})();

export default combat;
