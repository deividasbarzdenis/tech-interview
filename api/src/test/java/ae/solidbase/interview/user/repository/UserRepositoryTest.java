package ae.solidbase.interview.user.repository;

import ae.solidbase.interview.user.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static ae.solidbase.interview.util.DateUtil.dateToLocalDate;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class UserRepositoryTest {
    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByIdentity() throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = formatter.parse("1977-10-13");
        User user = User.builder()
                .name("Ben")
                .surname("Frog")
                .birthDate(dateToLocalDate(date))
                .email("ben".concat("@mail.ae"))
                .password("1234")
                .phone("865899900")
                .identity("55-12345")
                .passportNumber("39801253478")
                .build();
        testEntityManager.persist(user);
        User testUser = userRepository.findByIdentity("55-12345");
        assertThat(testUser.getIdentity()).isEqualTo("55-12345");
    }

}
