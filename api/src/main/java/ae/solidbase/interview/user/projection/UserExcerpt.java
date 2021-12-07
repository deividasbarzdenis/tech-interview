package ae.solidbase.interview.user.projection;

import ae.solidbase.interview.user.model.User;
import org.springframework.data.rest.core.config.Projection;


@Projection(name = "excerpt", types = User.class)
public interface UserExcerpt {
    Long getId();
    String getName();
    String getSurname();
    String getIdentity();
}
