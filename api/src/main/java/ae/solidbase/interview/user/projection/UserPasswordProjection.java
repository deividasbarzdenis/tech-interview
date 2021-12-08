package ae.solidbase.interview.user.projection;

import ae.solidbase.interview.user.model.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "passwords", types = { User.class })
public interface UserPasswordProjection{

    String getPassword();

}
