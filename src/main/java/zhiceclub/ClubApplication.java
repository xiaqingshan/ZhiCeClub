package zhiceclub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ClubApplication {

    @RequestMapping("/")
    public String greeting() {
        return "欢迎来到智测俱乐部！";
    }

    public static void main(String[] args) {
        SpringApplication.run(ClubApplication.class, args);
    }
}
