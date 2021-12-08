package ae.solidbase.interview.user.repository;

import ae.solidbase.interview.user.model.User;
import ae.solidbase.interview.user.projection.UserExcerpt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = UserExcerpt.class)
public interface UserRepository extends JpaRepository<User, Long> {

    Page<User> findByName(String name, Pageable pageable);
    Page<User> findByNameIsLike(String name);
    Page<User> findByNameAndSurname(String name, String surname, Pageable pageable);
    User findByIdentity(String identity);
}
