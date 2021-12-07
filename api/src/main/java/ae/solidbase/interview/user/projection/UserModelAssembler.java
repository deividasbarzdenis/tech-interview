package ae.solidbase.interview.user.projection;

import ae.solidbase.interview.user.controller.UserController;
import ae.solidbase.interview.user.model.User;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;

public class UserModelAssembler extends RepresentationModelAssemblerSupport<User, UserModel> {

    public UserModelAssembler() {
        super(UserController.class, UserModel.class);
    }

    @Override
    protected UserModel instantiateModel(User user) {
        return new UserModel(user);
    }

    @Override
    public UserModel toModel(User user) {
        return createModelWithId(user.getId(), user);
    }
}
