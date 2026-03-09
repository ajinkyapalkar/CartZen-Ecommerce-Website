package com.ecommerce;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ecommerce.model.Product;
import com.ecommerce.model.Role;
import com.ecommerce.model.User;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            ProductRepository productRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        /* ================= PRODUCTS ================= */

        addProductIfNotExists("Laptop", "High performance laptop", 40000,
                "https://rukminim2.flixcart.com/image/480/480/xif0q/computer/i/7/r/latitude-3420-business-laptop-dell-original-imagn6hrwnczrmzv.jpeg?q=90");

        addProductIfNotExists("Smartphone", "Latest model smartphone", 75000,
                "https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pro_Max_Blue_Titanium_PDP_Image_Position-1__en-IN.jpg");

        addProductIfNotExists("Headphones", "Noise-cancelling headphones", 3500,
                "https://m.media-amazon.com/images/I/71L70bAl2KL._AC_UF1000,1000_QL80_.jpg");

        addProductIfNotExists("Smartwatch", "Fitness smartwatch", 10000,
                "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Wearable%20Devices/Images/309465_0_stnogk.png");

        addProductIfNotExists("Camera", "Digital camera", 20000,
                "https://rukminim2.flixcart.com/image/480/480/camera/b/t/y/canon-eos-1000d-slr-original-imacya3hzsyzjhnv.jpeg?q=90");

        addProductIfNotExists("iPad", "Apple product", 50000,
                "https://suprememobiles.in/cdn/shop/files/apple_ipad_air_5th_gen_gray.webp");

        addProductIfNotExists("One Plus", "This is a latest new smartphone", 30000,
                "https://spigen.in/cdn/shop/files/detail_web_oneplus12_ultrahybrid_01_1024x1024.jpg");

        addProductIfNotExists("Dell", "This is a latest new Laptop", 35000,
                "https://5.imimg.com/data5/IZ/WE/TV/SELLER-76766217/dell-laptop-500x500.jpg");

        addProductIfNotExists("HP", "This is a latest new high performance laptop", 45000,
                "https://www.hp.com/content/dam/sites/worldwide/personal-computers/consumer/laptops-and-2-in-1s/new/bf-updates/media@2x1.jpg");

        addProductIfNotExists("SONY", "This is a latest new high Smart TV", 45000,
                "https://sony.scene7.com/is/image/sonyglobalsolutions/TVFY24_UM_1_FrontWithStand_M?$productIntroPlatemobile$");

        /* ================= ADMIN USER ================= */

        createAdminIfNotExists();
    }

    /* ---------- PRODUCT METHOD ---------- */

    private void addProductIfNotExists(String name, String description, double price, String imageUrl) {
        if (!productRepository.existsByName(name)) {
            productRepository.save(
                    new Product(null, name, description, price, imageUrl)
            );
            System.out.println("Inserted product: " + name);
        } else {
            System.out.println("Skipped duplicate product: " + name);
        }
    }

    /* ---------- ADMIN METHOD ---------- */

    private void createAdminIfNotExists() {

        if (userRepository.findByUsername("admin").isEmpty()) {

            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ROLE_ADMIN);

            userRepository.save(admin);

            System.out.println("Admin user created (username: admin)");
        } else {
            System.out.println("Admin user already exists");
        }
    }
}
  
