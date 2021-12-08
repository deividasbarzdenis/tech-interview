package ae.solidbase.interview.user.projection;

import ae.solidbase.interview.user.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;

@Projection(name = "UserView", types = {User.class})
public interface UserView {
    @Value("#{target.id}")
    Long getId();
    String getName();
    String getSurname();
    LocalDate getBirthDate();
    String getEmail();
    String getPhone();
    String getIdentity();
    String GetPassportNumber();
}
