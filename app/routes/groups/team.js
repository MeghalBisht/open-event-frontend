import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

@classic
export default class EditRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const groupTitle = model.group.name;
    return groupTitle.concat(' - Team');
  }

  async model(params) {
    const group = await this.store.findRecord('group', params.group_id, {
      include: 'events'
    });
    return hash({
      group,
      roleInvites      : null,
      usersGroupsRoles : null
    });
  }
}
