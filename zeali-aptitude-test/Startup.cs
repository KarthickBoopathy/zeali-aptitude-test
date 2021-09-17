using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services;

namespace zeali_aptitude_test
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("ZealiAptitudePolicy", builder => // NOTE THE NAME OF THE POLICY HERE; IT IS POSSIBLE TO HAVE MORE THAN ONE POLICY
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });
            services.AddSingleton<IDBClient, DBClient>();

            services.Configure<ZealiAptitudeTestDBConfig>(
               Configuration.GetSection(nameof(ZealiAptitudeTestDBConfig)));

         

            services.AddSingleton<ZealiAptitudeTestDBConfig>(sp =>
                sp.GetRequiredService<IOptions<ZealiAptitudeTestDBConfig>>().Value);

            services.Configure<OTPConfiguration>(
            Configuration.GetSection(nameof(OTPConfiguration)));
            services.AddSingleton<OTPConfiguration>(sp =>
                sp.GetRequiredService<IOptions<OTPConfiguration>>().Value);

            services.AddTransient<IZealiAptitudeTestServices, ZealiAptitudeTestServices>();
            services.AddTransient<IEmailAndSecurityManagment, EmailAndSecurityManagment>();
            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseCors(); 
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
