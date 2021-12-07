package ae.solidbase.interview.user.projection;

import ae.solidbase.interview.user.model.User;
import lombok.Getter;
import org.springframework.hateoas.RepresentationModel;

import java.time.LocalDate;

@Getter
public class UserModel extends RepresentationModel<UserModel> {

    private final Long id;
    private final String name;
    private final String surname;
    private final LocalDate birthDate;
    private final String email;
    private String password;
    private final String phone;
    private final String identity;
    private final String passportNumber;

    public UserModel(User user){
        this.id = user.getId();
        this.name=user.getName();
        this.surname =user.getSurname();
        this.birthDate = user.getBirthDate();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.identity = user.getIdentity();
        this.passportNumber = user.getPassportNumber();
    }
}
