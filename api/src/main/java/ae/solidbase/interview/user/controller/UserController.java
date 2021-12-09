package ae.solidbase.interview.user.controller;


import ae.solidbase.interview.user.exception.UserNotFoundException;
import ae.solidbase.interview.user.hateoasModel.UserModel;
import ae.solidbase.interview.user.hateoasModel.UserModelAssembler;
import ae.solidbase.interview.user.model.User;
import ae.solidbase.interview.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@AllArgsConstructor
@RepositoryRestController()
//@BasePathAwareController
public class UserController {

    private final UserService userService;

    /**
     * Convert  users to ModelEntity "by name" and send to
     */
    @GetMapping(path = "/userByNameAndSurname", produces = "application/hal+json")
    public ResponseEntity<EntityModel<UserModel>> getUserByNameAndSurname(@RequestParam String name,
                                                                          @RequestParam String surname) throws UserNotFoundException {
        User user = userService.getUserByNameAndSurname(name, surname);
        UserModel userModel = new UserModelAssembler().toModel(user);
        EntityModel<UserModel> model = EntityModel.of(userModel,
                linkTo(methodOn(UserController.class)
                        .getUserByNameAndSurname(name, surname))
                        .withRel("NameAndSurname"));
        return new ResponseEntity<>(model, HttpStatus.OK);
    }

    private List<UserModel> convertUsersToModels(List<User> users){
        return users.stream()
                .map(user -> new UserModelAssembler().toModel(user))
                .collect(Collectors.toList());
    }
}
