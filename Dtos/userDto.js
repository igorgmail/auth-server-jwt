module.exports = class UserDto {
  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.email = model.email;
    this.role = model.role;
    this.isConfirmed = model.isConfirmed;
    this.confirmedLink = model.confirmedLink;
  }

  static userFullDto(instance) {
    if (!instance) {
      throw new Error('Instance of UserDto is required');
    }
    const user = {
      id: instance.id,
      name: instance.name,
      email: instance.email,
      role: instance.role,
      isConfirmed: instance.isConfirmed,
    };
    return user;
  }
  static userForTokenDto(instance) {
    if (!instance) {
      throw new Error('Instance of UserDto is required');
    }
    const user = {
      name: instance.name,
      email: instance.email,
    };
    return user;
  }
  static userJustRegDto(instance) {
    if (!instance) {
      throw new Error('Instance of UserDto is required');
    }
    const user = {
      id: instance.id,
      email: instance.email,
      role: instance.role,
    };
    return user;
  }
};
